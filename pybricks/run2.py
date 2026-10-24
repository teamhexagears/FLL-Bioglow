# Team Green - M15
# Starting position 6 from the bottom  

if __name__ == "__main__":
    import main
from pybricks.tools import run_task, wait


def r2(robot):
    run_task(robot.both_attachment_reset(left_power=0, right_power=-50, distance=46, move_speed=350))
    robot.turn(-35)
    run_task(robot.both_attachment_turn(right_angle=150, right_speed=1000, distance=70, move_speed=1000))
    # v1
    #run_task(robot.both_attachment_reset(left_power=0, right_power=-50, distance=54, move_speed=350))
    #robot.turn(-40)
    #run_task(robot.both_attachment_turn(right_angle=150, right_speed=1000, distance=5, move_speed=1000))
    robot.right_attachment_turn(angle=-80, speed=500)
    robot.right_attachment_turn(angle=200, speed=150)
    wait(100)
    robot.right_attachment_turn(angle=-110, speed=250)
    robot.move(-20)
    robot.turn(30)
    robot.move(-70)
