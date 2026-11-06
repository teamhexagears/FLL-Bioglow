# Team Red M2 + M5 - Exploding Seeds
# Driving base starting  position: Four squares from the right

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r2(robot):
    run_task(robot.both_attachment_reset(distance=78.8, move_speed=1000, left_power=40, left_speed=50, right_power=40, right_speed=300))
    robot.turn(17)
    robot.right_attachment_turn(-225, speed=3000)
    
    run_task(robot.curve_move_reset(speed=1000, radius=460, distance=-62, left_power=40, right_power=0, left_speed=50, right_speed=0))
    robot.turn(110)
    robot.move(12, speed=110)
    robot.left_attachment_turn(angle=-50, speed=500)
    #run_task(robot.both_attachment_turn( left_angle=-85, right_angle=-0, distance=-45))
    run_task(robot.curve_move(speed=1000, radius=-700, distance=-50, left_angle=-50, right_angle=-0))
    robot.stop()