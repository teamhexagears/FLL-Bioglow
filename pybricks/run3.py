# Team Red - M8 + M9 + M10
# starting position=3rd square from the right (thick line)

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r3(robot):
    # Reset skipped for now
    run_task(robot.both_attachment_reset(60, left_power=0, right_power=-50))
    ##robot.move(60)
    robot.turn(-90)
    robot.move(-24.5)
    robot.turn(90)
    robot.move(27)
    robot.move(5)
    robot.move(-5,711)
    robot.move(5,711)
    robot.move(-5,711)
    robot.move(5,711)
    robot.move(-5,711)
    robot.move(5,711)
    robot.right_attachment_turn(120,9999999)
    robot.turn(14)
    robot.turn(-20)
