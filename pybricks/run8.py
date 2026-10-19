# green team
# M13 + M6 (ant)
# Starting positin 1 thick from the left

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r8(robot):
    run_task(robot.both_attachment_reset(distance=75, move_speed=500, left_power=0, right_power=50))
    robot.turn(50)
    robot.move(7.5)
    robot.right_attachment_turn(-305, 255)
    robot.right_attachment_turn(300, 250)
    robot.turn(30)
    robot.move(-48)
    robot.turn(-30)
    robot.move(25, 125)
    robot.move(-10)
    robot.turn(75)
    robot.move(40)
    robot.turn(45)
    robot.move(50)