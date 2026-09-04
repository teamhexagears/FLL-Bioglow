if __name__ == "__main__":
    import main

from umath import atan2, sqrt
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor, ColorSensor, UltrasonicSensor
from pybricks.parameters import Button, Color, Direction, Port, Side, Stop
from pybricks.robotics import DriveBase
from pybricks.tools import wait, StopWatch, hub_menu, multitask, run_task
# setup
class Robot:
    def __init__(self):
        self.hub = PrimeHub()
        self.left_motor = Motor(Port.F, Direction.COUNTERCLOCKWISE)
        self.right_motor = Motor(Port.B, Direction.CLOCKWISE)
        self.right_attachment = Motor(Port.A, Direction.CLOCKWISE, [12, 20])
        self.left_attachment = Motor(Port.D, Direction.COUNTERCLOCKWISE, [12, 20])
        self.drive_base = DriveBase(self.left_motor, self.right_motor, wheel_diameter=62, axle_track=140)
        self.left_color = ColorSensor(Port.E)
        self.right_color = ColorSensor(Port.C)
        self.drive_base.use_gyro(True)
        self.drive_base.settings(150, 300, 200, 325)
        self.white = Color(h=0, s=0, v=5)
        self.black = Color(h=0, s=0, v=95)
        self.left_color.detectable_colors([self.white, self.black])
        self.right_color.detectable_colors([self.white, self.black])


# function
    def move(self, distance, speed=150):
        self.drive_base.settings(speed, 300, 200, 325)
        self.drive_base.reset(0,0)
        wait(50)
        self.drive_base.straight(distance * 10, then=Stop.HOLD, wait=True)
        self.drive_base.stop()

    async def parallel_move(self, distance, speed=150):
        self.drive_base.settings(speed, 300, 200, 325)
        self.drive_base.reset(0,0)
        await wait(50)
        await self.drive_base.straight(distance, then=Stop.HOLD, wait=True)
        self.drive_base.stop()

    def turn(self, angle, speed=150):
        self.drive_base.settings(150, 300, speed, 325)
        self.drive_base.reset(0,0)
        wait(50)
        self.drive_base.turn(angle, then=Stop.HOLD, wait=True)
        self.drive_base.stop()

    async def move_till_stalled(self, speed=150):
        max_voltage=14000
        self.left_motor.settings(max_voltage/2)
        self.right_motor.settings(max_voltage/2)
        await self.drive_base.drive(speed, 0)
        heading=self.hub.imu.heading()
        prev=0
        diff=67
        wait(500)
        while(diff>0.1):
            heading=self.hub.imu.heading()
            diff=abs(prev-heading)
            print(diff)
            prev=heading
            wait(50)
        self.drive_base.stop()
        self.left_motor.settings(max_voltage=7000)
        self.right_motor.settings(max_voltage=7000)
        self.drive_base.stop()
        
    def move_till_line(self, speed=50):
        # Start moving forward
        self.drive_base.drive(speed, 0)
    
        # State tracking:
        # 0 = searching for white line
        # 1 = found white, waiting for black (non-white)
        # 2 = found white-to-black transition
        # 3 = complete (final state)
        l_state = 0
        r_state = 0
    
        # Debounce counters to filter out transient false positives
        l_counter = 0
        r_counter = 0
        DEBOUNCE_TARGET = 5  # Must see the color 5 times in a row to transition

        while True:
            # --- LEFT SENSOR STATE MACHINE ---
            l_color = self.left_color.color()
            if l_state == 0:
                if l_color == self.white:
                    l_counter += 1
                    if l_counter >= DEBOUNCE_TARGET:
                        l_state = 1
                        l_counter = 0
                else:
                    l_counter = 0  # Reset if the streak breaks
            elif l_state == 1:
                if l_color == self.black:
                    l_counter += 1
                    if l_counter >= DEBOUNCE_TARGET:
                        l_state = 2
                        l_counter = 0
                else:
                    l_counter = 0
            elif l_state == 2:
                l_state = 3

            # --- RIGHT SENSOR STATE MACHINE ---
            r_color = self.right_color.color()
            if r_state == 0:
                if r_color == self.white:
                    r_counter += 1
                    if r_counter >= DEBOUNCE_TARGET:
                        r_state = 1
                        r_counter = 0
                else:
                   r_counter = 0
            elif r_state == 1:
                if r_color == self.black:
                    r_counter += 1
                    if r_counter >= DEBOUNCE_TARGET:
                        r_state = 2
                        r_counter = 0
                else:
                    r_counter = 0
            elif r_state == 2:
                r_state = 3

            # --- ALIGNMENT ROTATIONS ---
            # If left sensor finishes first, rotate clockwise to align right sensor
            if l_state == 3 and r_state < 3:
                self.drive_base.stop()
                self.drive_base.drive(0, 30)  # Slowly turn clockwise
                r_counter = 0
                while r_state < 3:
                    r_color = self.right_color.color()
                    if r_state == 0:
                        if r_color == self.white:
                            r_counter += 1
                            if r_counter >= DEBOUNCE_TARGET:
                                r_state = 1
                                r_counter = 0
                        else:
                            r_counter = 0
                    elif r_state == 1:
                        if r_color == self.black:
                            r_counter += 1
                            if r_counter >= DEBOUNCE_TARGET:
                                r_state = 2
                                r_counter = 0
                        else:
                            r_counter = 0
                    elif r_state == 2:
                        r_state = 3
                    wait(10)

            # If right sensor finishes first, rotate counter-clockwise to align left sensor
            elif r_state == 3 and l_state < 3:
                self.drive_base.stop()
                self.drive_base.drive(0, -30)  # Slowly turn counter-clockwise
                l_counter = 0
                while l_state < 3:
                    l_color = self.left_color.color()
                    if l_state == 0:
                        if l_color == self.white:
                            l_counter += 1
                            if l_counter >= DEBOUNCE_TARGET:
                                l_state = 1
                                l_counter = 0
                        else:
                            l_counter = 0
                    elif l_state == 1:
                        if l_color == self.black:
                            l_counter += 1
                            if l_counter >= DEBOUNCE_TARGET:
                                l_state = 2
                                l_counter = 0
                        else:
                            l_counter = 0
                    elif l_state == 2:
                        l_state = 3
                    wait(10)

            # Exit condition: both sensors have completed the transition
            if l_state == 3 and r_state == 3:
                break

            wait(10)

        self.drive_base.stop()
        

    def curve_move(self, speed, straight_distance, turn_distance):
        print('1')
        heading = 0
        self.drive_base.reset(0,0)
        self.drive_base.settings(speed)
        # check if one of them is 0
        if turn_distance == 0 or straight_distance == 0:
            print("straight_distance or turn_distance cannot be 0!!!")
            return
        print('2')
        # Calculate the circle radius and arc angle to hit the (x, y) target
        radius = sqrt(turn_distance ** 2 + straight_distance ** 2)
        ## AI wrote this - radius = (turn_distance ** 2 + straight_distance ** 2) / (2 * turn_distance)
        arc_angle = atan2(straight_distance, turn_distance)*100
        print("R: " + str(radius))
        print("A: " + str(arc_angle))
        #self.drive_base.arc(radius=radius, angle=arc_angle)
        self.drive_base.arc(radius=straight_distance, angle=90)

        print('4')
        heading = 90-(self.hub.imu.heading())
        if straight_distance < 0:
            heading -= 180
        self.drive_base.turn(heading)
        self.stop()


    def stop(self):
        self.drive_base.stop()

    def right_attachment_turn(self, angle, speed=300):
        self.right_attachment.run_angle(speed, angle)

    async def parallel_right_attachment_turn(self, angle, speed=300):
        await self.right_attachment.run_angle(speed, angle)

    async def parallel_left_attachment_turn(self, angle, speed=300):
        await self.left_attachment.run_angle(speed, angle)

    def left_attachment_turn(self, angle, speed=300):
        self.left_attachment.run_angle(speed, angle)

    async def right_attachment_reset(self):
        await self.right_attachment.run_until_stalled(700, duty_limit=40)

    async def left_attachment_reset(self):
        await self.left_attachment.run_until_stalled(700, duty_limit=40)

    async def both_attachment_turn(self,right_angle=0, left_angle=0, right_speed=100, left_speed=100, distance=0):
        await multitask(
            self.parallel_right_attachment_turn(right_angle, right_speed),
            self.parallel_left_attachment_turn(left_angle, left_speed),
            self.parallel_move(distance)
        )

    async def both_attachment_reset(self, distance, speed=150):
        await multitask(
            self.left_attachment_reset(),
            self.right_attachment_reset(),
            self.parallel_move(distance, speed)
        )
