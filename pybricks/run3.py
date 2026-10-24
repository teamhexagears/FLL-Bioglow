# Team Red M2 + M5
# Driving base starting  position: Three squares from the right

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

#Three squares from the right

def r3(robot):
    robot.move(77)
    robot.right_attachment_turn(-225, speed=3000)
    robot.right_attachment_turn(225, speed=3000)
    robot.move(2.5)
    robot.right_attachment_turn(-225, speed=2700)
    robot.move(-75)
    robot.left_attachment_turn(-40) 
    robot.turn(42)
    robot.move(47)
    robot.left_attachment_turn(angle=-50, speed=500)
    run_task(robot.both_attachment_turn( left_angle=-85, right_angle=-0, distance=-45))
    robot.stop()