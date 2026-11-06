# green team
# M13 + M6 + M12 + M11 + M7
# Starting position vertical 7th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task, wait

def r5(robot):
    # Go to animal platform
    robot.turn(60, speed=100)
    run_task(robot.both_attachment_reset(distance=59, move_speed=800, left_power=45, right_power=45, left_speed=600))
    robot.turn(75, speed=100)
    run_task(robot.both_attachment_turn(right_angle=-30, right_speed=300, distance=21.5, move_speed=400))
    wait(200)

    # drop animal
    run_task(robot.both_attachment_turn(left_angle=-700, right_angle=-320, left_speed=3000, right_speed=3000))
    run_task(robot.right_attachment_turn(angle=70, speed=500))
    wait(800)
    run_task(robot.right_attachment_turn(angle=230, speed=300))

    # Go to cane
    robot.move(-6.5, speed=1000)
    robot.turn(45, speed=800)
    run_task(robot.both_attachment_turn(right_angle=-300, right_speed=300, distance=-5))
    robot.move(8.2, speed=100)

    # Lift cane
    run_task(robot.right_attachment_turn(angle=80, speed=500))
    robot.turn(25, speed=100)
    robot.turn(-33, speed=100)
    
    # go to ants
    robot.move(-50, speed=1000)
    robot.turn(-35, speed=800)
    run_task(robot.both_attachment_turn(right_angle=300, right_speed=500, distance=25, move_speed=90))
    
    # Push Ant
    #robot.move(distance=25, speed=90)

    # Go Window of the Past
    robot.move(-9,speed=1000)
    robot.turn(70, speed=800)

    # Hit and go home
    run_task(robot.curve_move(speed=300, radius=800, distance=83))
    robot.stop()
