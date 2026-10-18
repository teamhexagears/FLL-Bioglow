# Team Red - M8 + M9 + M10
# starting position=4th square from the left

if __name__ == "__main__":
    import main

from pybricks.tools import run_task

def r3(robot):

    # Reset and move
    #run_task(robot.both_attachment_reset(60, left_power=0, right_power=50))
    #robot.left_attachment_turn(10)
    #robot.move(60)
    # Move to tree
    #robot.turn(-90)
    #robot.move(-24.5)
    #robot.turn(90)
    #robot.move(5)

    # Crash into Tree
    #robot.move(80)

    # Turn right attachment to remove vine
    #robot.right_attachment_turn(120)
  
    # Move around to knock seed down
    #robot.thrust(5,711)
    #robot.thrust(-5,711)
    #robot.thrust(5,711)
    #robot.thrust(-5,711)
    #robot.thrust(5,711)
    #robot.thrust(-5,711)
    #robot.thrust(5,711)

    
    
    

  

    # vine removal 
    #robot.turn(14)
    #Escape 
    #robot.move(-15)
    #robot.turn(20)
    #robot.move(-70)

    # code starts here:

    run_task(robot.curve_move(radius=700, distance=74, speed=300))
    robot.turn(-59)
    robot.right_attachment_turn(-37.5, 6000)
    robot.move(8.5)
    robot.right_attachment_turn(-67.5, 6000)

    robot.move(-11)
    robot.move(distance=30, speed=1000)
    robot.thrust(-5,711)
    robot.thrust(5,711)
    robot.move(distance=-25, speed=100)
    run_task(robot.curve_move(radius=-700, distance=-74, speed=300))