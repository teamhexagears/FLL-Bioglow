if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def m3(robot):
    robot.move(5)
    robot.turn(57)
    robot.both_attachment_turn(75, 45, 45, 0, 0)