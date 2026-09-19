# team red

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m1(robot):
    run_task(robot.both_attachment_reset(34, 200))
    run_task(robot.both_attachment_turn(-347, -347, 160, 160))
    run_task(robot.both_attachment_turn(distance=-58, right_angle=-60,left_angle=-60))
    run_task(robot.both_attachment_turn(114.666666667, 114.666666667, 150, 150))
    robot.move(3.8)
    robot.move(-1)
    run_task(robot.both_attachment_turn( left_angle=-121.666666667, right_angle=-121.666666667, left_speed=110, right_speed=110))
    robot.move(-25, 130)
   
