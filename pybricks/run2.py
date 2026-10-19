# Team Red - M2 + M5
# Starting position: second thick line from the right

from pybricks.tools import run_task

def r2(robot):
    run_task(robot.both_attachment_reset(distance=0, move_speed=-100, left_power=40, right_power=40))
    robot.left_attachment_turn(-70) 
    robot.move(4)
    robot.turn(48)
    robot.move(45)
    robot.left_attachment_turn(angle=-90, speed=500)
    run_task (robot.both_attachment_turn( left_angle=-140, right_angle=-0, distance=-3.7))
    robot.turn(-40)
    robot.move(-20)
    robot.move(79)
    robot.right_attachment_turn(-225, speed=2250)
    robot.right_attachment_turn(225, speed=2250)
    robot.move(2.5)
    robot.right_attachment_turn(-225, speed=2250)
    robot.move(-80)

    
if __name__ == "__main__":
    import main