# team red

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m1(robot):
    run_task(robot.both_attachment_reset(340))
    run_task(robot.both_attachment_turn(-350, -350, 100, 100))
    run_task(robot.both_attachment_turn(distance=-5, right_angle=5,left_angle=5))
    #need to check