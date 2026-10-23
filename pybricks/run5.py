# Team Green - M1(drone) + M11a (seed retrieval)
# Starting position: first block from bottom left corner

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r5(robot):
    # Contact drone
    run_task(robot.both_attachment_reset(distance=48, move_speed=900, left_power=-50, right_power=0))

    # Move to flag
    robot.turn(-14.5)
    robot.move(36.5)

    # Smash drone
    robot.move(-3.5)
    robot.turn(angle=-32, speed=800)

    # Move to seed
    robot.turn(43, 500)
    robot.move(-2.5)
    robot.turn(20)
    robot.move(-17)
    robot.turn(-60)
    run_task(robot.curve_move(speed=400, radius=1000, distance=52, left_angle=200))

    #v3
    # Tight radius means a large angle, with a 100 mm radius, 200 mm of travel turns the robot about 115°.
    # Wide radius means a small angle. With a 1000 mm radius, the same 200 mm turns it only about 11°.
    # Doubling the radius halves the angle for the same distance.   
    

    #v1 below
    #robot.left_attachment_turn(angle=200, speed=400)
    #robot.move(30)
    #robot.left_attachment_turn(angle=-70, speed=150)

    #v4
    run_task(robot.left_attachment_while_move(left_angle=-70, left_speed=50, distance=-5, move_speed=50))

    #v1
    robot.turn(30)
    robot.move(75)