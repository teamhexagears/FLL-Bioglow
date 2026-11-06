# green team
# M13 + M6 + M12 + M11 + M7
# Starting position vertical 7th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task, wait

def r5(robot):
    
    #run_task(robot.both_attachment_turn(left_angle=-300, right_angle=-320, left_speed=3000, right_speed=3000))
    #return
    # Go to animal platform
    ##run_task(robot.both_attachment_reset(distance=0, move_speed=1000, left_power=45, right_power=45, left_speed=800))
    robot.turn(60, speed=100)
    run_task(robot.both_attachment_reset(distance=60, move_speed=1000, left_power=45, right_power=45, left_speed=800))
    ##run_task(robot.both_attachment_turn(right_angle=-150, right_speed=300, distance=60, move_speed=450))
    robot.turn(75, speed=100)
    run_task(robot.both_attachment_turn(right_angle=-30, right_speed=300, distance=21.5, move_speed=450))
    ##robot.move(9.5)
    #robot.move(12, speed=100)
    wait(200)

    # drop animal
    run_task(robot.both_attachment_turn(left_angle=-700, right_angle=-320, left_speed=3000, right_speed=3000))
    run_task(robot.right_attachment_turn(angle=75, speed=500))
    wait(200)
    run_task(robot.right_attachment_turn(angle=225, speed=500))

    # Go to cane
    robot.move(-6, speed=1000)
    robot.turn(45, speed=800)
    run_task(robot.both_attachment_turn(right_angle=-300, right_speed=500, distance=-5))
    robot.move(9, speed=100)

    # Lift cane
    run_task(robot.right_attachment_turn(angle=80, speed=500))
    robot.turn(30, speed=100)
    robot.turn(-38, speed=100)
    
    # go to ants
    robot.move(-50, speed=1000)
    robot.turn(-35, speed=800)
    run_task(robot.both_attachment_turn(right_angle=300, right_speed=500, distance=-3))
    
    # Push Ant
    robot.move(distance=28, speed=90)

    # Go Window of the Past
    robot.move(-9,speed=1000)
    robot.turn(30, speed=800)
    #run_task(robot.right_attachment_turn(angle=-250, speed=1500))
    robot.turn(40, speed=800)

    # Hit and go home
    run_task(robot.curve_move(speed=300, radius=800, distance=83))
    robot.stop()
