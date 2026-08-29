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
        self.right_attachment = Motor(Port.A, Direction.CLOCKWISE, [20])
        self.left_attachment = Motor(Port.D, Direction.CLOCKWISE, [20])
        self.drive_base = DriveBase(self.left_motor, self.right_motor, wheel_diameter=62, axle_track=140)
        self.left_color = ColorSensor(Port.E)
        self.right_color = ColorSensor(Port.C)
        self.drive_base.use_gyro(True)
        self.drive_base.settings(150, 300, 200, 325)
        self.left_color.detectable_colors([Color.WHITE, Color.NONE])
        self.right_color.detectable_colors([Color.WHITE, Color.NONE])

# function

    def move(self, distance, speed=150):
        self.drive_base.settings(speed, 300, 200, 325)
        self.drive_base.reset(0,0)
        wait(50)
        self.drive_base.straight(distance, then=Stop.HOLD, wait=True)
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
        self.drive_base.stop()
        
        # State tracking: 0 = searching for white, 1 = searching for black, 2 = done
        l_state = 0
        r_state = 0

        
        while True:
            # check left color sensor state
            if self.left_color.color() == Color.WHITE:
                l_state = 1
            elif l_state == 1 and self.left_color.color() == Color.NONE:
                l_state = 2
                self.drive_base.stop()
            else:
                l_state = 0

            # check right color sensor state
            if self.right_color.color() == Color.WHITE:
                r_state = 1
            elif r_state == 1 and self.right_color.color() == Color.NONE:
                r_state = 2
                self.drive_base.stop()
            else:
                r_state = 0
            print("right: " + str(self.right_color.color()))
            print("left: " + str(self.left_color.color()))

            
            # If left sensor finishes first
            if l_state == 2:
                self.drive_base.stop()
                self.drive_base.drive(0, -30) # Slowly turn clockwise to align right sensor
                while r_state < 2:
                    if self.right_color.color() == Color.WHITE:
                        r_state = 1
                    elif r_state == 1 and self.right_color.color() == Color.NONE:
                        r_state = 2
                    else:
                        r_state = 0

            # If right sensor finishes first
            elif r_state == 2:
                self.drive_base.stop()
                self.drive_base.drive(0, 30) # Slowly turn counter-clockwise to align left sensor
                while l_state < 2:
                    if self.left_color.color() == Color.WHITE:
                       l_state = 1
                    elif l_state == 1 and self.left_color.color() == Color.NONE:
                        l_state = 2
                    else:
                        l_state = 0

            # exit condition
            if l_state == 2 and r_state == 2:
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

    async def both_attachment_turn(self, angle, speed=100):
        await multitask(
            self.parallel_right_attachment_turn(angle, speed),
            self.parallel_left_attachment_turn(angle * -1, speed)
        )