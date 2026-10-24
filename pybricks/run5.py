# Team Green - M1(drone) + M11a (seed retrieval)
# Starting position: first block from bottom left corner

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r5(robot):
    # Contact drone
    run_task(robot.both_attachment_reset(distance=45, move_speed=900, left_power=-50, right_power=0))

    # Move to flag
    robot.turn(-14.5, 800)
    robot.move(35, 1000)

    # Smash drone
    #robot.move(-1)
    robot.turn(angle=30, speed=800)
    #robot.move(-1)
    robot.turn(angle=-55, speed=800)
    robot.move(-2, speed=1000)
    robot.turn(angle=45, speed=800)
    robot.turn(angle=-60, speed=800)
    #robot.move(1)
    #robot.turn(angle=-20)
    #robot.move(-4)
    #run_task(robot.curve_move(speed=200, radius=-50, distance=5))

    # Move to seed
    robot.turn(60, 800)
    robot.move(-17, 1000)
    robot.turn(-60, 800)
    run_task(robot.curve_move(speed=1000, radius=885, distance=58, left_angle=200))

    # Get seed
    run_task(robot.left_attachment_while_move(left_angle=-70, left_speed=50, distance=-5, move_speed=50))

    # back to Blue base
    robot.turn(30, 800)
    robot.move(75, 1000)
    robot.stop()