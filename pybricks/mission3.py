if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m3(robot):
    robot.move(5)
    robot.turn(58)
    run_task(robot.both_attachment_turn(-50, 0, -45, 0, 800))
    robot.right_attachment_turn(40)
    