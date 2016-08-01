## N-Queens Visualizer

A visual exploration of local search algorithms which generate solutions to the N-Queens problem. Featured on [React Rocks](https://react.rocks/example/n-queens-visualizer).

VIEW LIVE: https://haseeb-qureshi.github.io/n-queens-visualizer

![preview](http://i.imgur.com/NLAFIIt.gif)

* Visualizes N-Queens problem using different local search algorithms
* Created an action queue to process moves asynchronously without violating the Flux pattern
* Uses custom-written easing function to simulate real-time speed modulation
* Transmits minimum possible information within action dispatches, to minimize space & time costs

Backlog of features:
* **DONE** Number queens
* **DONE** Implement all methods (backtracking, brute-force permutations, random permutations, simulated annealing, and iterative repair)
* **DONE** Speed bar
* **DONE** Smooth out speed modulation
* **DONE** Display number of iterations
* **DONE** Fix iterative repair action overload bug
* **DONE** Make brute force permutations show exact number of iterations
* **DONE** Display temperature for simulated annealing
* **DONE** Colorize temperature
* **DONE** Make algorithm selection immediately seed board
* **DONE** Slow down slowest speed
* **DONE** Replace easing function with correct speed modulation using dynamic intervals
* Pause and play buttons
* Optimize parameters for simulated annealing (currently resolves 68% of the time)
* Asterisk; mouseover iterations displays: number queens swapped, not total computations
* Highlight attack paths
* Animate movement of queens
* Show animations for every reset
* Make resizable from 4-20 N
* Show text explaining each search method
* Convert simulated annealing failure to modal
* Guided tour through sequence of possible search strategies
