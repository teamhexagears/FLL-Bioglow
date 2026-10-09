# Team Red - M2 + M5

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r2(robot):
    run_task(robot.both_attachment_reset(0, -100, 70, 60))
    robot.left_attachment_turn(-70) 
    robot.move(4)  
    robot.turn(48)
    robot.move(43)
    robot.left_attachment_turn(-90, 500)   
    run_task (robot.both_attachment_turn( left_angle=-140, right_angle=-0, distance=-2))
    robot.turn (-60)
    run_task(robot.both_attachment_turn(distance=6, right_angle=-57, move_speed=300 ))
    robot.turn(5)
    robot.move(3)
    robot.right_attachment_turn(-500, 400)