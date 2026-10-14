# Team Green - M1(drone) + M11a (seed retrieval)
# Starting position: first block from bottom left corner

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r5(robot):
    #v1
    #run_task(robot.both_attachment_reset(distance=80, move_speed=500, left_power=-50, right_power=0))
    
    # v2
    run_task(robot.both_attachment_reset(distance=45, move_speed=500, left_power=-50, right_power=0))
    robot.move(34)

    #v1
    robot.turn(-20)
    robot.move(5.5)
    robot.move(-2.5)
    robot.turn(angle=-43, speed=800)
    robot.turn(43, 500)
    robot.move(-3)
    robot.turn(20)
    robot.move(-20)
    robot.turn(-60)

    #v3
    # Tight radius means a large angle, with a 100 mm radius, 200 mm of travel turns the robot about 115°.
    # Wide radius means a small angle. With a 1000 mm radius, the same 200 mm turns it only about 11°.
    # Doubling the radius halves the angle for the same distance.   
    run_task(robot.curve_move(speed=400, radius=680, distance=62, left_angle=200))
    #robot.left_attachment_turn(angle=200)
    #run_task(robot.left_attachment_while_move(left_angle=200, left_speed=300, distance=30))
    

    #v1 below
    #robot.left_attachment_turn(angle=200, speed=400)
    #robot.move(30)
    #robot.left_attachment_turn(angle=-70, speed=150)
    #v4
    run_task(robot.left_attachment_while_move(left_angle=-70, left_speed=50, distance=-5, move_speed=50))

    #v1
    robot.turn(35)
    robot.move(75)