# green team
# M13 + M6 (ant)
# Starting positin 1 thick from the left

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r8(robot):
    # Go to animal platform
    run_task(robot.both_attachment_reset(distance=75, move_speed=1000, left_power=0, right_power=50))
    robot.turn(50, speed=800)
    robot.move(7.5,speed=1000)

    # Dspeed drop animal
    robot.right_attachment_turn(angle=-310, speed=255)
    robot.right_attachment_turn(angle=305, speed=250)

    # Go to ants
    robot.move(-5,speed=1000)
    run_task(robot.curve_move(speed=1000, radius=-330, distance=-45))
    #robot.turn(30)
    #robot.move(-37)
    robot.turn(-80, speed=800)

    # Push Ant
    robot.move(distance=22, speed=90)

    # Go home
    robot.move(-10,speed=1000)
    robot.turn(75, speed=800)
    robot.move(20, speed=1000)
    run_task(robot.curve_move(speed=1000, radius=730, distance=60))
    robot.stop()