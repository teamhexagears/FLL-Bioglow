# Team Red - M8 + M9 + M10

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r3(robot):
    # Reset skipped for now

    robot.move(62)
    robot.turn(90)
    robot.move(23.5)
    robot.turn(-90)
    robot.move(7)
    robot.left_attachment_turn(2500, speed=1000)