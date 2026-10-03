# team Blue - M7 & M12
# starting position-vertical 8th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r8(robot):
    robot.move(23)
    robot.turn(90)
    robot.move(57.5)
    robot.turn(67.5)
    robot.right_attachment_turn(-220)
    robot.move(8)
    run_task(robot.both_attachment_turn(120, 200, 400, 600, 0, 450))
    