# green team
# M13 + M6 (ant)
# Starting positin vertical 7th block

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r8(robot):
    # Go to animal platform
    #run_task(robot.curve_move_reset(speed=1000, radius=305, distance=70, left_power=50, right_power=40, left_speed=1000, right_speed=800))
    run_task(robot.both_attachment_reset(distance=0, move_speed=1000, left_power=50, right_power=50))
    run_task(robot.curve_move(speed=1000, radius=305, distance=65, left_angle=0, right_angle=-160))
    robot.move(14)
    run_task(robot.both_attachment_turn(left_angle=-200, right_angle=110, left_speed=1000, right_speed=800))
    robot.turn(13)
    #robot.move(3)

    #robot.right_attachment_turn(angle=50, speed=800)
    #robot.turn(50, speed=800)
    #robot.move(12,speed=1000)
    robot.move(13,speed=1000)
    # drop animal
    #run_task(robot.both_attachment_turn(left_angle=-320, right_angle=-320, left_speed=1000, right_speed=800))
    #run_task(robot.both_attachment_turn(left_angle=320, right_angle=320, left_speed=1000, right_speed=800))
    # new drop animal
    run_task(robot.both_attachment_turn(left_angle=-500, right_angle=-320, left_speed=1500, right_speed=500))
    return

    # Go to ants
    robot.move(-5,speed=1000)
    run_task(robot.curve_move(speed=1000, radius=-330, distance=-45))
    #robot.turn(30)
    #robot.move(-37)
    robot.turn(-80, speed=800)

    # Push Ant
    robot.move(distance=22, speed=90)

    # Go home
    robot.move(-10,speed=1000)
    robot.turn(75, speed=800)
    robot.move(20, speed=1000)
    run_task(robot.curve_move(speed=1000, radius=730, distance=60))
    robot.stop()