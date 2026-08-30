if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m5(robot):
    run_task(robot.both_attachment_reset(500, 400))

    robot.right_attachment_turn(100)
    robot.right_attachment_turn(1000, 500)