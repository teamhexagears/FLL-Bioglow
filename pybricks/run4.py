# Team Green - M15 - Biocentric
# Starting position 6 from the bottom  

if __name__ == "__main__":
    import main
from pybricks.tools import run_task, wait


def r4(robot):
    # Move to building
    run_task(robot.both_attachment_reset(left_power=50, right_power=-40, distance=46, move_speed=1000))
    robot.turn(-35, 800)
    run_task(robot.both_attachment_turn(right_angle=135, right_speed=1000, distance=60, move_speed=1000))

    # Lift Roof
    robot.right_attachment_turn(angle=-90, speed=1000)
    robot.right_attachment_turn(angle=200, speed=150)
    wait(100)
    robot.right_attachment_turn(angle=-110, speed=250)

    # Go to Window to the Past (M11)
    robot.move(-20,1000)
    robot.turn(38,800)
    robot.move(58.5,1000)

    # Get seed
    robot.left_attachment_turn(-155)

    # Go blue base
    robot.turn(30,800)
    robot.move(50,1000)
    robot.stop()