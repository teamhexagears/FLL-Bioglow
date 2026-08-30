if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m3(robot):
    run_task(robot.both_attachment_reset(500, 400))

    robot.move(500)