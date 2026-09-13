# team red

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m1(robot):
    run_task(robot.both_attachment_reset(340, 100))
    run_task(robot.both_attachment_turn(-347, -347, 100, 100))
    run_task(robot.both_attachment_turn(distance=-58, right_angle=-60,left_angle=-60))
    run_task(robot.both_attachment_turn(-349, -349, 100, 100))