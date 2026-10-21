# Team Red - M2 + M5
# Starting position: second thick line from the right

from pybricks.tools import run_task

def r2(robot):
    robot.left_attachment_turn(-40) 
    robot.move(4)
    robot.turn(50)
    robot.move(47)
    robot.left_attachment_turn(angle=-50, speed=500)
    run_task(robot.both_attachment_turn( left_angle=-70, right_angle=-0, distance=-40.7))
    robot.turn(-40.3)
    robot.move(-12.7)
    robot.move(79)
    robot.right_attachment_turn(-225, speed=2250)
    robot.right_attachment_turn(225, speed=2250)
    robot.move(2.5)
    robot.right_attachment_turn(-225, speed=2250)
    robot.move(-80)

    
if __name__ == "__main__":
    import main