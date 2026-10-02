# Team Red - M2 + M5

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r2(robot):
    run_task(robot.left_attachment_reset(60))
    robot.left_attachment_turn(-82, 500)   
    robot.turn(36)
    robot.move(36)
    robot.left_attachment_turn(-105, 500)   
    run_task (robot.both_attachment_turn( left_angle=-140, right_angle=-0, distance=-2))
    robot.turn (-50)
    robot.move(73)
    robot.right_attachment_turn(230)
    robot.turn(10)
    robot.move(3)
    robot.turn(15)
    
    