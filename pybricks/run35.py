if __name__ == "__main__":
    import main

from pybricks.tools import run_task

#Three squares from the right

def r35(robot):
    robot.move(78)
    robot.right_attachment_turn(-225, speed=2250)
    robot.right_attachment_turn(225, speed=2250)
    robot.move(2.5)
    robot.right_attachment_turn(-225, speed=2250)
    robot.move(-80)
    