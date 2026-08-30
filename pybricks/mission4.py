if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m4(robot):
    run_task(robot.reset_both_attachments(500, 400))
    robot.turn(90)

