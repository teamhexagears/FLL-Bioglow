# Team Red - M2 + M5

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r2(robot):
    run_task(robot.left_attachment_reset()) 
    robot.left_attachment_turn(-105, 500)   
    robot.turn(42)
    robot.move(33.5)
    #robot.left_attachment_turn(-105, 500)   
    run_task (robot.both_attachment_turn( left_angle=-140, right_angle=-140, distance=-2))
    #robot.move(-30)