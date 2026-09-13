# Wesley's Mission 4 code ya baby

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m4(robot):
    run_task(robot.left_attachment_reset())
    robot.move(67)
    robot.turn(-45)