if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m4(robot):
    run_task(robot.both_attachments_reset(500, 400))
    robot.turn(90)

