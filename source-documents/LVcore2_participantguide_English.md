# LabVIEW
TM
Core 2
Participant Guide
Course Software Version 2020
September 2020 Edition
Part Number 328140B-01
LabVIEW Core 2
Copyright
© 2020 National Instruments Corporation. All rights reserved.
Under the copyright laws, this publication may not be reproduced or transmitted in any form,
electronic or mechanical, including photocopying, recording, storing in an information retrieval
system, or translating, in whole or in part, without the prior written consent of National
Instruments Corporation.
National Instruments respects the intellectual property of others, and we ask our users to do the
same. NI software is protected by copyright and other intellectual property laws. Where NI
software may be used to reproduce software or other materials belonging to others, you may
use NI software only to reproduce materials that you may reproduce in accordance with the
terms of any applicable license or other legal restriction.
End-User License Agreements and Third-Party Legal Notices
```
You can find end-user license agreements (EULAs) and third-party legal notices in the following
```
```
locations:
```
• Notices are located in the <National Instruments>\_Legal Information and
<National Instruments> directories.
• EULAs are located in the <National Instruments>\Shared\MDF\Legal\License
directory.
• Review <National Instruments>\_Legal Information.txt for more information on
including legal information in installers built with NI products.
Copyright 2020 National Instruments
Trademarks
Refer to theNI Trademarks and Logo Guidelines at ni.com/trademarks for more information
on National Instruments trademarks.
ARM, Keil, and μVision are trademarks or registered of ARM Ltd or its subsidiaries.
LEGO, the LEGO logo, WEDO, and MINDSTORMS are trademarks of the LEGO Group.
TETRIX by Pitsco is a trademark of Pitsco, Inc.
FIELDBUS FOUNDATION™ and FOUNDATION™ are trademarks of the Fieldbus Foundation.
EtherCAT® is a registered trademark of and licensed by Beckhoff Automation GmbH.
CANopen® is a registered Community Trademark of CAN in Automation e.V.
DeviceNet™ and EtherNet/IP™ are trademarks of ODVA.
Go!, SensorDAQ, and Vernier are registered trademarks of Vernier Software & Technology.
Vernier Software & Technology and vernier.com are trademarks or trade dress.
Xilinx is the registered trademark of Xilinx, Inc.
Taptite and Trilobular are registered trademarks of Research Engineering & Manufacturing Inc.
FireWire® is the registered trademark of Apple Inc.
Linux® is the registered trademark of Linus Torvalds in the U.S. and other countries.
Handle Graphics®, MATLAB®, Real-Time Workshop®, Simulink®, Stateflow®, and xPC
TargetBox® are registered trademarks, and TargetBox™ and Target Language Compiler™ are
trademarks of The MathWorks, Inc.
Tektronix®, Tek, and Tektronix, Enabling Technology are registered trademarks of Tektronix,
Inc.
The Bluetooth® word mark is a registered trademark owned by the Bluetooth SIG, Inc.
The ExpressCard™ word mark and logos are owned by PCMCIA and any use of such marks by
National Instruments is under license.
The mark LabWindows is used under a license from Microsoft Corporation. Windows is a
registered trademark of Microsoft Corporation in the United States and other countries.
Other product and company names mentioned herein are trademarks or trade names of their
respective companies.
Members of the National Instruments Alliance Partner Program are business entities independent
from National Instruments and have no agency, partnership, or joint-venture relationship with
National Instruments.
Patents
For patents covering National Instruments products/technology, refer to the appropriate
```
location: Help»Patents in your software, the patents.txt file on your media, or theNational
```
Instruments Patent Notice at ni.com/patents.
Support
Worldwide Technical Support and Product Information
ni.com
Worldwide Offices
Visit ni.com/niglobal to access the branch office websites, which provide up-to-date
contact information, support phone numbers, email addresses, and current events.
National Instruments Corporate Headquarters
11500 North Mopac Expressway Austin, Texas 78759-3504 USA Tel: 512 683 0100
For further support information, refer to theAdditional Information and Resources appendix.
To comment on NI documentation, refer to the NI website at ni.com/info and enter the Info
Code feedback.
Copyright 2020 National Instruments
Table of Contents
© National Instruments Corporation | iii
Student Guide
A. NI Certification ......................................................................... vii
B. Course Description.................................................................... vii
C. What You Need to Get Started ................................................... viii
D. Installing the Course Software.................................................... viii
E. Course Goals ........................................................................... viii
Lesson 1
Transferring Data
A. Communicating Between Parallel Loops ....................................... 1-3
B. Exploring Channel Wires ............................................................ 1-6
C. Using Channel Templates........................................................... 1-12
Exercise 1-1 Parallel Loops with a Stream Channel.......................... 1-16
Exercise 1-2 A Simple Tag Channel............................................... 1-21
D. Using Channel Wires Interactions................................................ 1-28
Exercise 1-3 Channels, SubVIs, Cases........................................... 1-29
E. Transferring Data – Queues ....................................................... 1-32
Exercise 1-4 Fix Buffer Overflow Error Using Stream Communication .. 1-34
Lesson 2
Creating an Event-Driven User Interface
A. Event-Driven Programming ......................................................... 2-3
B. User Interface Event Handler Design Pattern ................................ 2-6
Exercise 2-1 User Interface Event Handler Design Pattern ................ 2-7
C. Event-Driven State Machine Design Pattern.................................. 2-18
Exercise 2-2 Event-Driven State Machine ....................................... 2-20
D. Producer/Consumer (Events) Design Pattern ................................. 2-36
```
Exercise 2-3 Producer/Consumer (Events) ...................................... 2-39
```
E. Channeled Message Handler (CMH) Design Pattern ....................... 2-43
Exercise 2-4 Channeled Message Handler ...................................... 2-45
Lesson 3
Controlling the User Interface
A. VI Server Architecture ............................................................... 3-3
B. Property Nodes and Control References ....................................... 3-4
Exercise 3-1 Property Nodes and Control References....................... 3-9
C. Invoke Nodes ........................................................................... 3-14
Exercise 3-2 Customize the VI Window..... ..................................... 3-15
Copyright 2020 National Instruments
Table of Contents
iv | ni.com
Lesson 4
Managing Configuration Settings in an Application
A. Managing Configuration Settings .................................................4-3
B. Managing Configuration Settings Using a Delimited File..................4-7
C. Managing Configuration Settings Using an Initialization (INI) File......4-9
Exercise 4-1 Managing Configuration Settings Using an INI File .........4-12
Lesson 5
Developing an Error Handling Strategy
A. Error Handling Overview.............................................................5-3
B. Injecting Errors for Testing..........................................................5-9
Exercise 5-1 Inject Errors..............................................................5-11
C. Handling Specific Errors Locally...................................................5-14
Exercise 5-2 Handle an Error Locally ..............................................5-19
D. Creating an Execution Log Files...................................................5-24
Exercise 5-3 Create an Execution Log File.......................................5-27
Lesson 6
Distributing Applications
A. Preparing Code for Distribution....................................................6-3
Exercise 6-1 Preparing Files for Distribution ....................................6-6
B. Build Specifications ...................................................................6-9
C. Creating and Debugging an Application ........................................6-10
Exercise 6-2 Create and Debug a Stand-Alone Application ................6-17
D. Creating an Installer...................................................................6-20
Exercise 6-3 Create an Installer .....................................................6-23
E. Creating a Package for Distribution ..............................................6-27
Exercise 6-4 Creating a Package....................................................6-29
Appendix A
Additional Information and Resources
Copyright 2020 National Instruments
Student Guide
In this student guide, you learn about the LabVIEW
Learning Path, the course description, and the items you
need to get started in the LabVIEW Core 2 course.
Topics
A. NI Certification
B. Course Description
C. What You Need to Get Started
D. Installing the Course Software
E. Course Goals
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | vii
A. NI Certification
TheLabVIEW Core 2 course is part of a series of courses designed to build your
proficiency with LabVIEW and help you prepare for the NI Certified LabVIEW Associate
```
Developer (CLAD) exam. The following illustration shows the courses that are part of
```
the LabVIEW training series. Refer to ni.com/training for more information about NI
Certification.
B. Course Description
TheLabVIEW Core 2 course is an extension of the LabVIEW Core 1 course and
teaches you to create event-driven applications. This course assumes that you are
familiar with Windows and that you have experience writing algorithms in the form of
flowcharts or block diagrams.
The Participant Guide is divided into lessons. Each lesson contains the following:
• An introduction with the lesson objective and a list of topics and exercises.
• Slide images with additional descriptions of topics, activities, demonstrations, and
multimedia segments.
• A set of exercises to reinforce topics. Some lessons include optional and challenge
exercises.
• A lesson review that tests and reinforces important concepts and skills taught in
the lesson.
Note For Participant Guide updates and corrections, refer to ni.com/info
and enter the Info Code core2.
If you do not have hardware, you still can complete the exercises. Alternate instructions are
provided for completing the exercises without hardware. You also can substitute other
hardware for those previously mentioned. For example, you can use another NI DAQ device
connected to a signal source, such as a function generator.
Copyright 2020 National Instruments
Student Guide
viii | ni.com
C. What You Need to Get Started
Before you use this course manual, make sure you have all of the following items:
• Computer running Windows 10
• LabVIEW 2020 or later
• NI-DAQmx 20.0 or later
• Real or simulated NI PCI 6221 or NI USB 6212, with BNC-2120.
•LabVIEW Core 2 course media, from which you install the following folders:
D. Installing the Course Software
Complete the following steps to install the course software.
1. Insert the course media in your computer. The LabVIEW Core 2 Course Setup
dialog box appears.
2. Click Install the course materials.
3. Follow the on-screen instructions to complete installation and setup.
File Locations
Exercise files are located in the C:\Exercises\LabVIEW Core 2 folder assuming that
you installed the files on your root directory.
Solution files are located in the C:\Solutions\LabVIEW Core 2 folder assuming that
you installed the files on your root directory.
E. Course Goals
This course prepares you to do the following:
• Execute multiple parallel loops
• Create event-driven applications using design patterns
• Control the user interface
• Manage configuration settings in an application
• Develop error strategies for your application
• Create and distribute stand-alone applications and package installers
Directory Content
Exercises Contains VIs used in the course.
Solutions Contains completed course exercises.
Copyright 2020 National Instruments
1
Transferring
Data
In this lesson, you will learn to use channel wires to
communicate between parallel sections of code without
imposing an execution order.
Topics
A. Communicating Between Parallel Loops
B. Exploring Channel Wires
C. Using Channel Templates
D. Using Channel Wires Interactions
E. Transferring Data – Queues
Exercises
Exercise 1-1 Parallel Loops with a Stream Channel
Exercise 1-2 A Simple Tag Channel
Exercise 1-3 Channels, SubVIs, Cases
Exercise 1-4 Fix Buffer Overflow Error Using Stream Communication
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-3
A. Communicating Between Parallel Loops
Review using channel wires to communicate between parallel loops.
When Do You Need Parallel Loops?
• Independent parallel operations.
• Pipeline data processing.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-4 | ni.com
• Operations that must execute at different rates.
If these three operations had the same time requirement, they could just be three
parallel operations in a single loop.
In this example:
• The top loop has a sample rate of 1000 Hz and reads 1000 samples each iteration,
so this loop executes once every second.
• The middle loop executes once every two seconds.
• And the bottom loop executes once every five seconds.
Communicating Between Parallel Loops
In LabVIEW, the flow of data rather than the sequential order of commands determines
the execution order of block diagram elements. In common applications you need to
have multiple parallel running tasks.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-5
A challenge in programming parallel tasks is passing data among multiple loops
without creating a data dependency.
Communicating Between Parallel Loops - Direct Wires Do Not
Work
You cannot pass the data among parallel loops using a regular wire. If you pass the
data using a regular wire, the loops are no longer parallel.
```
Demonstration: Parallel Loops and Wires
```
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-6 | ni.com
B. Exploring Channel Wires
Explore and use the basic features and functionality of channel wires.
Communicating Between Parallel Loops – Channel Wires
Channel wires operate differently from dataflow wires. Channel wires allow transfer
of data between the loops running in parallel without forcing an execution order.
```
Demonstration: Parallel Loops and Channels
```
Channel Wires
A channel wire expresses an asynchronous communication between two parallel
sections of code without forcing an execution order.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-7
Channel Wires
Every channel wire must have at least two endpoints: a writer and a reader. Endpoints
are places in the code that exchange data. Writer endpoints write data into the
channel. Reader endpoints read data out of the channel. You enable asynchronous
data communication between parallel sections of code by connecting the writer
endpoint to the reader endpoint.
Data Types Accepted by Channel Wires
Channel wires accept any data type found in LabVIEW, e.g., Boolean, numeric,
waveform, cluster, array, object, string, path, etc.
Note The color of the channel wire indicates the data type accepted by the
channel.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-8 | ni.com
Creating a ChannelChannel endpoints do not appear on the palettes. You create them by using the right-click menus on terminals and selecting the channeltemplate you would like to use. LabVIEW provides several channel templates. Select the channel template to use based on your applicationneeds.1.

To create a channel, create a writer endpoint at first. Right-click the data element and select
Create»Channel Writer
from the shortcut
menu.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-9
2.

Create a reader endpoint. Right-click the output of the writer endpoint and select
Create»Channel Reader
from the shortcut menu.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-10 | ni.com
Abort Capability of Channel Wires
Channels have abort capability to stop multiple parallel loops with one stop button.
The abort signal can be raised at either endpoint of the channel. In the example below,
either of the stop buttons stops both loops immediately, dropping any buffered data.
The last element? signal allows consumer loop to continue reading all the buffered
data after the producer loop is stopped. Use this option if you need to process all
buffered samples.
Caveats and Recommendations
• Do not connect loops with a combination of regular wires and channel wires. This
may result in a hang when the code runs.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-11
```
• Channels are not data and cannot be put in data containers (clusters, arrays, data
```
```
value references, etc.).
```
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-12 | ni.com
C. Using Channel Templates
Identify the differences between channel templates.
Three Main Channel Templates
Now that you have parallel loops, there are scenarios where you might need to
communicate data between parallel loops.
Stream Channel
Use this channel when you want to continuously transfer every point of
data from one loop to another. For example, you might acquire data in one
loop and transfer every point of acquisition data to a second loop to
process or log the data.
Tag Channel
Use this channel when you want to share only the latest value. For
example, a loop might only want to know the latest value of a stop button
or only the latest setpoint value.
Messenger Channel
Use this channel when you transfer messages between loops, and each
message might also include message data that can use whatever is the
most appropriate data type. For example, every time a user clicks a
Process Data button, the application can send a message that includes the
data to process to separate processing loop.
There are additional channel templates that you can experiment with:
• Accumulator Tag
• High Speed Stream
• Lossy Stream
• One Element Stream
• Event Messenger
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-13
Stream Channel
```
• The data elements are buffered and transferred with no data loss (FIFO order) from
```
a single writer to a single reader.
Buffering with a Stream Channel
• The channel could use a lot of memory for buffering if the producer loop
consistently runs faster than the consumer loop which will cause a buffer overflow
error.
• You can set the size on the writer endpoint to limit the buffer.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-14 | ni.com
Stream Channel Write and Read Endpoints
The Write endpoint writes an element to a Stream channel. The endpoint waits if the
channel is full.
The Read endpoint reads an element from a Stream channel. The endpoint waits if the
channel is empty.
Use the size input of the Write endpoint to specify the maximum number of elements
that can be buffered in the channel.
Note The channel size initializes on the first call of the write endpoint.
After the initialization, the Write endpoint ignores the size input.
Use timeout in ms input of the endpoints to set the time, in milliseconds, that the
endpoint has to write or read the specified data to or from the channel.
Use the count output of the endpoints to get information about the buffered data
elements. The count output of endpoints returns the number of elements in the
channel after the endpoint updates the channel.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-15
Use Last Element Output to Stop Parallel Loops
• Use the last element? input and last element? output of endpoints to stop both
loops when the last element is read from the channel.
A channel initializes when the block diagram it's on begins running. A channel closes
when the last element? input of the writer endpoint is TRUE. If a channel closes, it
ignores further writes to the channel. The reader endpoint continues reading data
```
elements until the last element? (F) output of the reader endpoint returns TRUE. This
```
functionality can be used to stop multiple parallel loops with one stop button. The
channel reinitializes when its calling block diagram begins another run.
Communicating Stop Signal with a Stream Channel
• Not recommended if the only data you are communicating is the stop signal
because you can build up a backlog in the channel if the writer runs faster than
the reader.
• Use a Tag channel instead in such cases.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-16 | ni.com
Exercise 1-1: Parallel Loops with a Stream ChannelGoalUse a Stream channel to transfer data between two parallel loops.ScenarioYou have a simple VI which has two While Loops. The Writer Loop produces data and the Reader Loop consumes that data running in parallel.Create a Stream channel to transfer data between these two parallel running loops.Guided Instruction1.

Open a blank VI and save it as
Parallel Loops with a Stream Channel.vi
in the
```
C:\Exercises\LabVIEW Core 2\Stream Channel
```
directory.
2.

Build the front panel as shown in the figure below.
1
Buffered Data
—This indicator returns the number of elements in the channel after the endpoint updates the channel.
2
Stop button
—Use this button to stop both loops.
12
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-17
3.

Open the block diagram of the VI. The figure below shows an example of the block diagram as it appears after your modifications.Steps 5 and 6 instruct you on how to create a Stream channel to transfer the output data elements of the sine function to the
Reader
Chart
indicator.
4.

Set front panel and block diagram options for comfortable code development.
*
Navigate to
Tools»Options
and select
Block Diagram
from the
Category
list.
*
Enable
Show subVI names when dropped
option to display VI, function, and other nodes name labels when you place them on the block
diagram.
*
Manipulate other options if necessary.
5.

Create a Stream channel.
*
Right-click the output of the
Sine
```
function and select
```
Create»Channel Writer
from the shortcut menu.
1
Write VI
—Write endpoint writes an element to a Stream channel.
2
Read VI
—Reads an element from a Stream channel.
1
2
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-18 | ni.com
- Select Stream as a Channel Template and Write for the Endpoint in the Select
Channel Endpoint dialog box.
- Right-click the output of the Write VI and select Create»Channel Reader from the
shortcut menu.
- Select Stream as a Channel Template and Read for the Endpoint in the Select
Channel Endpoint dialog box.
- Place Read VI inside of the Reader Loop.
6. Make appropriate connections to transfer data from the Writer Loop to the Reader
Loop, to show buffered data elements, and to stop both loops with one Stop
button.
- Connect the output of the Stop button to the last element (F) input of the Write VI.
- Connect the last element? output of the Read VI to the conditional terminal of the
Reader Loop.
- Connect the count output of the Read VI to the Buffered Data indicator.
7. Save and run the VI.
8. Note that the results of the Writer Chart and the Reader Chart are the same.
9. Click the Stop button to stop the execution.
10. Set the input value of the Wait function of the Reader Loop to 500 ms.
11. Run the VI and pay attention on the value of the Buffered data indicator.
12. Click the Stop button and observe that the reader loop continues executing until
the buffer contains data.
13. Stop and close the VI.
End of Exercise 1-1
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-19
Tag Channel
Use a Tag channel to share a single value among multiple readers and/or writers.
```
Reader endpoints always read the latest value (no buffering).
```
Use the missed output of the reader endpoint to indicate the number of times that the
element from the channel has been overwritten.
If missed is 0 it means the reader is reading a new value the writer has written, and
```
there is no missed data; if missed is -1, the reader is re-reading the same value as last
```
time, i.e., the writer has not yet written to the Tag channel since the last read.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-20 | ni.com
Stop Parallel Loops with a Tag Channel
A simple way to stop parallel running loops with a single stop button is to do it with
a Tag channel.
Use this only when there is no other data to communicate between the loops.
Two Loops With Both Stream and Tag Channels
Avoid using multiple channels to pass data between the same loops. This causes
deadlock or data integrity issues.
A deadlock occurs when two parallel operations are both waiting on each other. Alpha
cannot proceed until Beta finishes, and Beta cannot proceed until Alpha finishes.
When there are multiple channels, especially multiples of different templates, each
endpoint has different rules for how long it waits for data and what conditions make
it stop. If those conditions occur for one endpoint but not for the other in the same
loop, that loop may stop processing, and stall the application.
Likewise, it is easy to think that you are sending paired data through two channels and
forget that the loops may process the data asynchronously, thus losing any pairing the
sender intended.
Use only one channel between any pair of loops to avoid such confusion. It is best to
have only one method of communicating between parallel operations. Use multiple
methods of communication only when you need redundancy, e.g. in case of possible
transmission errors over network communication.
General rule: always combine your stop signal into the same communications
mechanism as your other data. This rule applies to more than channel wires!
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-21
Exercise 1-2: A Simple Tag Channel
Goal
Use a Tag channel to stop multiple parallel loops with a single stop button.
Scenario
You have a simple VI with multiple independent While Loops. Create a Tag channel to
stop these loops with a single Stop button.
Guided Instruction
1. Open a blank VI and save it as A Simple Tag Channel.vi in the
```
C:\Exercises\LabVIEW Core 2\Tag Channel directory.
```
2. Place a Stop button on the front panel of the VI.
3. Build the block diagram as shown in the figure below.
Step 4 instructs you on how to create a Tag channel to transfer data between
parallel running loops.
4. Create a Tag channel to pass the data of the stop button between loops.
- Right-click the output of the Stop button and select Create»Channel Writer from
the shortcut menu.
1 Write VI—Writes a value to a Tag channel.
2 Read VI—Reads a value from a Tag channel.
3 Number To Decimal String function—Converts a number to a string of decimal digits.
4 Concatenate Strings function—Concatenates input strings and 1D arrays of strings into a
single output string.
1
2
3
4
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-22 | ni.com
- Select Tag as a Channel Template and Write for the Endpoint in the Select Channel
Endpoint dialog box.
- Right-click the output of Write VI and select Create»Channel Reader from the
shortcut menu.
- Select Tag as a Channel Template and Read for the Endpoint in the Select Channel
Endpoint dialog box.
- Place Read VI inside of the Loop B.
- Repeat the previous three steps and create one more Read VI. Place the Read VI
inside the Loop C.
5. Right-click each Concatenate Strings function and select Create Indicator to create
Loop A, Loop B, and Loop C indicators.
6. Make appropriate connections as shown in the figure above.
7. Save and run the VI.
End of Exercise 1-2
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-23
Messenger ChannelUse the Messenger channel to transfer command-like messages.Messenger channel is capable of consolidating repetitive messages and disposing orphaned messages when the channel aborts.Messenger Channel Write and Read EndpointsThe write endpoint writes a value to a Messenger channel and blocks if the channel is full. Reader endpoint waits to read a value from aMessenger channel.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-24 | ni.com
If the wait for ack input is True, the write endpoint will not complete until the message
is acknowledged by the reader. You can use this input to synchronize the writer and
reader loops.
Note “ack” = “acknowledge”.
The id output is a unique message number, which can be used to wait for an
acknowledgment at a later time.
Note There is no last element? input or output on the endpoints of the
Messenger channel, because you can encode this feature as a message, and
in particular, there could be multiple messages that mean stop for different
reasons.
Replace the Channel
Use the Replace»Channel Endpoint option from the shortcut menu of the channel
endpoint to replace one channel template with another.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-25
Forkable Channels
Some channels allow you to fork the channel wire to have multiple writers and/or
multiple readers.
All Tag and Messenger channels are forkable - you can have multiple writers and/or
multiple readers.
All Stream channels are not forkable.
Non-Forkable Channels
You can use the Replicate endpoint for Stream channels. To do that, right-click the
channel wire and select Insert»Replicate. This action duplicates a Stream channel as
two Stream channels so that each of the readers of the channels gets a separate copy
of the data written into the original channel.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-26 | ni.com
Adapt to Element TypeThe option to update the data type of a channel appears when the input is a different type, either a coercion dot or a completely unrelatedtype.•
Right-click the writer endpoint and select
Adapt To Element Type.
•
Right-click the reader endpoint and select
Adapt To Channel Type
.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-27
Debugging Channels
Use a special kind of probe to debug a channel. Run your VI, then right-click the
channel wire and choose Probe.
Note Debugging capabilities are not available for High Speed Stream
channels.
Specific Channel Endpoints
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-28 | ni.com
D. Using Channel Wires Interactions
Experience with the ability of channels to interact with Case structures and subVIs.
Interaction With Case Structures
You do not need to wire the channel in each frame of the Case structure.
You cannot wire a channel through a Case structure – or any other structure. Channel
wires do not create a dataflow connection, so wiring through is meaningless.
Interaction With Case Structures
Channel wire can be followed through a VI hierarchy. Channels are not restricted to
just the local block diagram.
Note In the above example, the subVI and the While Loop begin executing
at the same time and run in parallel.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-29
Exercise 1-3: Channels, SubVIs, Cases
Goal
A Writer Loop generates random numbers. Use a Stream channel to pass the higher
ones to one loop and the lower ones to another loop.
Scenario
You have a simple VI which has multiple While Loops. The Writer Loop generates
random numbers and writes the higher ones to one channel and the lower ones to
another channel. Create a Stream channel to pass these data elements with indexes
from the Writer Loop to the two reader loops.
Guided Instructions
1. Open a blank VI and save it as SubVIs and Cases.vi in the
```
C:\Exercises\LabVIEW Core 2\SubVIs and Cases directory.
```
2. Create the front panel as shown in the figure below.
3. Open the block diagram.
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-30 | ni.com
4. Create the block diagram as shown in the figure below following upcoming
instructions.
5. Create a writer loop to generate random numbers and write the higher ones with
their indexes to one channel and the lower ones to another channel.
- Create a While Loop.
- Place a Case structure inside of the While Loop.
- Select the False case and place a Case structure inside it.
- Configure the outer Case structure to compare a random number with a constant.
- Place a Bundle function and create a Stream channel in each case in the second
Case structure to write higher numbers in one channel and the lower numbers in
the other channel.
6. Create two Reader Loops to read generated data.
- Place two While Loops with the Reader A and Reader B subdiagram labels.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-31
- Place the Mean VI from the C:\Exercises\LabVIEW Core 2\SubVIs and Cases
directory inside each reader loop.
7. Complete the connections as shown in the figure above.
8. Configure the True case of the outer Case structure as shown in the figure below
to stop all loops with one Stop button. This is the reason we need 2 case
structures in this code.
9. Save and run the VI.
End of Exercise 1-3
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-32 | ni.com
E. Transferring Data – Queues
Demonstrate how to transfer every point of data between parallel loops using queues.
Communicating Data Between Parallel Loops – Queues
You can use Queues to transfer every point of data between parallel loops or VIs.
Channels vs. Queues
• Channels establish a static communication path within an application. In other
words, a fixed number of channels and a fixed number of parties communicating
on each channel.
Channels support broadcast communication.
• On the other hand, queues can establish a dynamic communication path within an
application. In other words, arbitrary communication paths can be decided at run
time between arbitrary number of communicants.
Queues do not have broadcast communication. Instead, use Notifiers.
```
Multimedia: Queues
```
Complete the multimedia module,Queues, available in the C:\Exercises\LabVIEW
Core 2\Multimedia\Queues\Queues.html directory to learn about programming with
events.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-33
Streaming Communication Case StudyA buffer overflow error occurs when the application is not able to keep up with the hardware acquisition.Let’s look at some examples of scenarios that can cause a buffer overflow error by either filling up the buffer too fast or emptying the buffertoo slowly.The following can contribute to filling up the buffer too fast.•
Faster sample rate – The VI adds data to the buffer more frequently.
•
Larger amounts of data – The VI adds more data each time it acquires data. Acquiring from a larger number of channels can contributeto this.
Acquiring large sets of data, such as images, can also contribute to this.
The following can contribute to emptying the buffer too slowly.•
Reading from buffer less frequently – The VI might read from the buffer less frequently as the additional processing code in the looptakes a longer time.
•
Reading less data – The VI might read a smaller number of samples from the DAQmx Read each loop iteration.
This means the VI takes
fewer samples from the buffer each iteration.
```
Demonstration: Fix Buffer Overflow Error Using Streaming Communication
```
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-34 | ni.com
```
Exercise 1-4: Fix Buffer Overflow Error Using Stream CommunicationGoalFix a buffer overflow problem using Producer/Consumer (Data) design pattern.Hardware Setup(Hardware)
```
In the exercises where we work with Analog Input/Output channels, we use PCI-6221/USB-6212 multifunction I/O device paired
with the BNC-2120 shielded connector block. Analog Input 2 should be connected to the Sine/Triangle BNC connector. Analog Input 3 shouldbe connected to the TTL Square Wave BNC connector. The Sine/Triangle waveform switch should be set to Sine.
Note

This hardware setup is going to be used throughout the course in several exercises.
```
(Simulated)
```
In the absence of hardware solutions, we use a simulated
PCI-6221
multifunction I/O device.
##### Observe Buffer Overflow Error1.

Open
```
C:\Exercises\LabVIEW Core 2\Fix Buffer Overflow\Fix Buffer Overflow.lvproj
```
.
2.

From the
Project Explorer
window, open the Buffer Overflow VI.
3.

Examine the block diagram.*
DAQmx VIs outside the While Loop are configuring the DAQmx device to continuously acquire data at a sample rate of 1,000 Hz.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-35
- The code in the While Loop repeatedly performs the following actions.
– Read 100 samples from the DAQmx buffer in the computer memory.
– Check how many samples are left in the DAQmx buffer.
```
– Simulate the duration of processing code (for example, analysis nodes,
```
```
write to file, and so on) by using a Wait (ms) function.
```
4. Observe a buffer overflow error.
- On the front panel, set the controls to the following values.
- Run the VI.
- Describe the behavior of the Samples in DAQ Buffer indicator.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
Note Notice this indicator shows that the number of samples in the buffer
remains within the same range and does not continue increasing redundant
over time. This indicates that the DAQmx Read is reading and taking out the
samples in the DAQ buffer frequently enough.
- Increase the Process Duration (ms) control by increments of 25. This simulates
putting more and more time-intensive processing into the While Loop. This can
cause each While Loop iteration to take longer, which causes the DAQmx
Read to read less and less frequently from the DAQ buffer.
- Each time you increment, check if the Samples in DAQ Buffer indicator starts
to increase redundant over time.
- By the time you increase the value of the Process Duration (ms) control to 100
or more, you should notice that the number of samples left in the DAQ buffer
will continue to increase because the VI is not reading samples from the DAQ
buffer frequently enough.
Eventually, the VI will return the following error because the DAQ buffer has
a finite maximum number of samples it can hold.
Sample Rate 1,000
Number of Samples 100
```
Process Duration (ms) 25
```
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-36 | ni.com
Note Increase the Process Duration to 1,000 to get this error faster. In this
VI, this error will occur when Samples in DAQ Buffer is greater than 10,000.
5. Predict how fast the processing code must execute to prevent the buffer from
growing.
- If Sample Rate is 1,000 and Number of Samples is 100, what values of
Process Duration will prevent the DAQ buffer from continuously growing
larger and larger?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
```
(Answer) If the Sample Rate is 1,000 Hz (samples per second) and the number
```
of samples the DAQmx Read reads every iteration is 100, then the DAQmx
```
Read must execute at least once every 0.1 seconds (the sample rate divided
```
```
by the number of samples read per iteration) to prevent the DAQ buffer from
```
growing.
For the DAQmx Read to execute at least once every 0.1 seconds, the processing code
duration must be at least less than 100 ms on average. Remember the DAQmx Read
also has an execution duration.
Fix Buffer Overflow Problem
1. From the Project Explorer window, open the Fix Buffer Overflow with Queue VI.
2. Examine the block diagram. Notice that the acquisition code and processing code
are now separated into two different loops.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-37
3.

Modify the block diagram, as shown in the following figure, to stream data from the acquisition loop to a separate processing loop.
1
Obtain Queue function
—Creates a queue and returns a reference to that queue.
2
Waveform Constant
—Add a waveform constant to the block diagram and wire it to the
element data type
input. This sets the data type of the queue
to Waveform.
3
Enqueue Element function
—Adds an element to the queue.
4
Dequeue Element function
—Removes an element from the front of the queue and returns the element. Notice that this function has a
timeout
of 200 ms
wired to it. If no elements are available in the queue within 200 ms, this function will finish executing and output a True on its
timed out?
terminal.
```
This allows the rest of the code in the containing loop to execute (for example, check if the
```
Stop Processing Loop
```
button has been pressed) at least
```
once every 200 ms.
5
Case Structure
—Executes processing code only if the Dequeue Element function does not time out. Make sure the processing code is in the False case.
6
Get Queue Status function
—Returns information about the current state of the queue, such as the number of elements currently in the queue.
7
Release Queue function
—Notice that this VI uses dataflow to ensure that this function does not execute until all three loops have finished executing.
In general, you do not want to release the queue until all loops accessing the queue have finished executing.
1
2
4
3
56
7
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-38 | ni.com
- Wire the queue reference wires to connect the queue functions. The queue
reference wire specifies which queue the queue functions should perform their
action on.
4. Examine the behavior of the VI.
- On the front panel, set the controls to the following values.
- Run the VI.
Notice that the Samples in DAQ Buffer indicator never goes above a certain
number. This means the acquisition loop is reading samples from the DAQ
buffer frequently enough.
- Describe the behavior of the # Elements in Queue indicator.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
- Increase the Process Duration (ms) control to 1,000.
What is the behavior of the # Elements in Queue indicator now?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
Note If this indicator is steadily increasing, that means that overall the VI
is enqueueing elements at a faster rate than the VI is dequeueing elements.
Therefore, the number of elements in the queue is growing over time. It will
continue to grow until either the enqueue rate becomes equal to or slower
than the dequeue rate.
- Notice that although the number of elements in the queue is growing, the
LabVIEW buffer for the queue is much larger than the DAQ buffer, so the VI
can hold a much greater number of samples before breaking.
Sample Rate 1,000
Number of Samples 100
```
Process Duration (ms) 25
```
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-39
Note If the enqueue rate remains faster than the dequeue rate forever, the
number of elements in the queue will continue to grow until LabVIEW
eventually runs out of memory. LabVIEW does its best to optimize memory
usage, but eventually LabVIEW will run out of memory and crash if the
queue keeps growing forever.
- Click the Stop Acquisition Loop button on the front panel.
Notice that the VI continues to run. The # Elements in Queue indicator now
starts to decrease because the Dequeue Element loop continues to remove
elements from the queue and process them. Eventually, this loop will dequeue
and process all the remaining elements.
```
Note To speed up the processing, decrease the Process Duration (ms)
```
control to 10 or less.
- When the # Elements in Queue is down to 0, click the Stop Processing Loop
button and click the Stop Queue Monitoring Loop button.
On the Job
Do any of your applications require streaming data from a writer loop to a reader loop?
Can you use a queue to stream data from the writer loop to the reader loop?
If so, what does the writer loop need to do? What does the reader loop need to do?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 1-4
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-40 | ni.com
Fix Buffer Overflow Problem
Techniques for fixing a buffer overflow problem include the following:
• Increase buffer size.
• Read the data from the buffer more frequently.
What if the number of elements in queue keeps growing? You have 2 options:
Option 1
• If the acquisition will eventually stop, then as long as the computer has enough
memory to hold the maximum number of elements in queue, then your VI will
eventually finish processing all the elements in the queue after the acquisition
stops.
Option 2
• If the acquisition is continuous, you can log all the data to file. Then process the
data at a later time by reading the data from file.
Note
Variables have their use in LabVIEW. You can use local variables to update a display
from multiple places in a block diagram. You can use global variables as repositories
for fixed constant data.
In some applications, you may see local variables used to read or write
front panel values as a way of sharing data between regions of one VI's
block diagram.
In some applications, you may see global variables used to access and
pass data among several VIs.
Here are some things to keep in mind when using variables.
• Every time you read from a local or global variable, LabVIEW must make a full copy
of your data – one copy of the data for the wire, and another to stay behind in the
variable in case something else reads it. When you use wires, LabVIEW can track
all the uses of a given value and optimize the data copies.
• Using variables for communication makes your block diagrams harder to read and
```
debug: you will discover that finding all uses of a variable is much harder than
```
following a wire downstream.
• Using variables for communication also opens the door torace conditions in your
```
code (places where you get unintended different results depending upon which of
```
```
the two pieces of parallel code execute first). These are the hardest type of bugs
```
to debug in any programming language, so we encourage the use of safer
communication methods.
Note NI recommends that you use dataflow wires and channel wires
instead of variables whenever it is possible. After that, consider using
queue, notifiers, or other reference-based types for communication.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-41
Summary
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 1-43
```
Activity: Lesson Review
```
1. Which of the following buffer data?
a. Stream Channel
b. Tag Channel
c. Messenger Channel
2. Which data types are accepted by channel wires?
a. Numeric, Boolean, and String
b. Waveforms
c. Arrays and Clusters
3. How will this code execute?
a. The code generates an error because there is no regular wire connecting the
two loops.
b. The Producer Loop and Consumer Loop execute at the same time. The two
loops run asynchronously.
c. The Producer Loop and Consumer Loop execute at the same time. The two
loops are synchronized to execute at the same rate.
d. The Consumer Loop waits for the Producer Loop to complete execution, but
the data from the Producer Loop is available immediately to the Consumer
Loop.
4. Match the following:
Obtain Queue a. Destroys the queue reference
Get Queue Status b. Creates an empty queue of the specified data type
Release Queue c. Adds an element to the back of a queue
Enqueue Element d. Determines the number of elements currently in the
queue
Copyright 2020 National Instruments
Lesson 1 Transferring Data
1-44 | ni.com
```
Activity: Lesson Review – Answers
```
1. Which of the following buffer data?
a. Stream Channel
b. Tag Channel
c. Messenger Channel
2. Which data types are accepted by channel wires?
a. Numeric, Boolean, and String
b. Waveforms
c. Arrays and Clusters
3. How will this code execute?
a. The code generates an error because there is no regular wire connecting the
two loops.
b. The Producer Loop and Consumer Loop execute at the same time. The two
loops run asynchronously.
c. The Producer Loop and Consumer Loop execute at the same time. The two
loops are synchronized to execute at the same rate.
d. The Consumer Loop waits for the Producer Loop to complete execution, but
the data from the Producer Loop is available immediately to the Consumer
Loop.
4. Match the following:
Obtain Queue b. Creates an empty queue of the specified data type
Get Queue Status d. Determines the number of elements currently in the queue
Release Queue a. Destroys the queue reference
Enqueue Element c. Adds an element to the back of a queue
Copyright 2020 National Instruments
2
Creating an
Event-Driven
User Interface
In this lesson, you learn how to create an application that
responds to user interface events using a variety of
event-driven design patterns.
Topics
A. Event-Driven Programming
B. User Interface Event Handler Design Pattern
C. Event-Driven State Machine Design Pattern
D. Producer/Consumer (Events) Design Pattern
E. Channeled Message Handler (CMH) Design Pattern
Exercises
Exercise 2-1 User Interface Event Handler Design Pattern
Exercise 2-2 Event-Driven State Machine
```
Exercise 2-3 Producer/Consumer (Events)
```
Exercise 2-4 Channeled Message Handler
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-3
A. Event-Driven ProgrammingThis section introduces event-driven programming and how to implement it using the Event structure.Demonstration: Event-Driven Application ScenarioPolling vs. EventsOne way to implement the previous functionality is by constantly polling the values of the controls on the front panel in a loop to check ifany control values have changed.In the following figure, you can see that this VI uses a shift register and a Not Equal node to determine if this Temperature control has changedits value. If the Temperature control has changed its value, then the Case structure will execute the True case.The VI also continuously checks if the Check Time button is TRUE. If so, the VI will execute the code in the TRUE case. Similarly, this VIalso continuously checks if the Acquire Data button is TRUE. If so, the VI will execute the code in the TRUE case.The False case of all these Case structures is empty.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-4 | ni.com
However, there are problems with polling:
• Constantly polling the control values requires CPU usage.
• Polling can fail to detect changes if the value changes too quickly. In this example,
if you click the Acquire Data button two times very quickly within one polling loop
period so that its value goes from FALSE to TRUE and back FALSE very quickly,
the block diagram might never read the TRUE value because you changed the
button value back to FALSE before the block diagram had a chance to read that
value.
The best way to implement event-driven functionality is to use an Event structure
instead.
Benefits of using Event structures include the following:
• Reduces the CPU requirements of the program.
• Simplifies the block diagram code.
• Guarantees that the block diagram can respond to all interactions the user makes.
• Handles all events in the order they occur.
• Does not miss any events.
```
Multimedia: Event-Driven Programming
```
Complete the multimedia module,Event-Driven Programming, available in the
```
C:\Exercises\LabVIEW Core 2\Multimedia\Event-Driven
```
Programming\Event-Driven Programming.html directory to learn about programming
with events.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-5
Configuring the Event StructureYou can select exactly which events will wake up your Event structure.1.

Right-click
Event
structure and select
Edit events Handled by This Case
.
2.

In the
Edit Events
```
dialog box, set the event source (e.g. control).
```
3.

In the
Edit Events
```
dialog box, set the event (e.g. Value Change).
```
```
Demonstration: Configure and use Events (Optional)
```
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-6 | ni.com
B. User Interface Event Handler Design Pattern
This section discusses how to create an event-driven application with the User
Interface Event Handler design pattern.
User Interface Event Handler Design Pattern
The User Interface Event Handler design pattern consists of an Event structure inside
a While Loop. Each event case of the Event structure is configured to handle a UI
event, such as a value change of a control on the front panel. Each event case also
contains the code to execute each time that event occurs.
User Interface Event Handler Design Pattern
• Each UI event triggers corresponding code to execute.
• Event structure handles events in the order they occurred.
• Event handling code should be short and quick.
```
Demonstration: Overview: Exercise 2-1
```
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-7
Exercise 2-1: User Interface Event Handler Design
Pattern
Goal
Develop an application using the User Interface Event Handler design pattern.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
You want to create an application that has a front panel with multiple buttons. Clicking
each button should trigger specific code to execute. You will use the User Interface
Event Handler design pattern to implement this application.
The following table lists the events you will implement in the User Interface Event
Handler VI you create.
Guided Instruction
1. Open C:\Exercises\LabVIEW Core 2\User Interface Event Handler\User
Interface Event Handler.lvproj.
2. From the Project Explorer window, open the User Interface Event Handler VI.
Notice that the front panel has already been created for you. In this application,
clicking each Boolean button should trigger its corresponding code to execute.
Event Event Description
“Exit”: Value Change Stops the While Loop.
“Acquire”: Value Change Acquires a finite acquisition.
“Analyze”: Value Change Analyzes data.
“Save Data”: Value Change Logs data to a text file.
“Clear”: Value Change Clears the graph data.
“Generate Stimulus”: Value Change Updates the Analog Output channel
signal.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-8 | ni.com
3. Explore the block diagram.
Notice that the block diagram contains the Boolean button terminals next to the
code that corresponds to each Boolean button.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-9
4.

Locate the
While Loop
already on the block diagram. Place an
Event
structure inside the
While Loop
.
5.

Wire the error wire through, as shown in the following figure.
1
Error Wire
—Wire the error wire through the Event structure so that it creates input and output tunnels.
2
Shift register
—Create shift register. Storing the acquired data in the shift register allows multiple event cases to update and read the
current acquisition data.
2
1
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-10 | ni.com
6.

Configure the Event structure to handle the
“Acquire”: Value Change
event.
1
“Acquire”: Value Change event
—Right-click the Event structure border, then click
Edit Events Handled by This Case
. In the Event
Sources section of the Edit Events window, click the
Controls»Acquire
, and in the Events section select
Value Change
.
2
Acquire
control and corresponding code
—Move this control and code inside the event case.
3
Shift register
—Wire the data output of the DAQmx Read VI into the shift register. This updates the current acquisition data stored in
the shift register. You will update and read this data in other event cases.
4
Graph
indicator
—Move and wire this indicator as shown. Rewire the error wires as shown.
5
Event Data Node
—Identifies the data that the Event structure returns when an event occurs. You can resize the node to display only
one or multiple elements.
1
2
4
3
5Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-11
7.

Configure the Event structure to handle the
“Analyze”: Value Change
event.
1
“Analyze”: Value Change event
—Right-click the Event structure border and select
Add Event Case
.
2
Edit Events window
—In the Event Sources section of the Edit Events window, click the
Controls»Analyze
, and in the Events section
select
Value Change.
3
Analyze
control and corresponding code
—Move this control and code inside the event case.
4
Shift register
—Wire the shift register data to the N-Channel Data input of the Analyze subVI to read the current acquisition data. Wire
the shift register data through the event case to store the data back in the shift register.
1
2
3
4
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-12 | ni.com
8.

Configure the Event structure to handle the
“Save Data”: Value Change
event.
1
“Save Data”: Value Change event
—Right-click the Event structure border and select
Add Event Case
.
2
Edit Events window
—In the Event Sources section of the Edit Events window, click the
Controls»Save Data
, and in the Events section
select
Value Change.
3
Save Data
control and corresponding code
—Move this control and code inside the event case.
4
Shift register
—Wire the shift register data to the input of the Transpose 2D Array function to read the current acquisition data. Wire the
shift register data through the event case to store the data back in the shift register.
1
4
3
2
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-13
9.

Configure the Event structure to handle the “
Clear”: Value Change
event.
1
“Clear”: Value Change event
—Right-click the Event structure border and select
Add Event Case
.
2
Edit Events window
—In the Event Sources section of the Edit Events window, click the
Controls»Clear
, and in the Events section select
Value Change.
3
Clear
control and corresponding code
—Move this control and code inside the event case.
4
Shift register
—Wire the empty 2D DBL array constant to the shift register. This clears the stored acquisition data in the shift register by
replacing it with empty data.
1
2
4
3
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-14 | ni.com
10. Configure the Event structure to handle the
“Generate Stimulus”: Value Change
event.
1
“Generate Stimulus”: Value Change event
—Click the Event structure border and select
Add Event Case
.
2
Edit Events window
—In the Event Sources section of the Edit Events window, click the
Controls»Generate Stimulus
, and in the Events
section select
Value Change.
3
Generate Stimulus control and corresponding code
—Move this control and code inside the event case.
4
Wire the tunnels—This case does not update or read the acquisition data.
5
Error Case structure
—Wrap the case structure containing the dialog boxes in another one and connect error wire to its conditional
terminal, then connect error and DAQmx task wires throughout the case structure in the
Error
and
No Error
cases. We do this to prevent
the dialog box from appearing in case of a VI error.
5
4
1
2
3
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-15
#### 11. Configure the Event structure to handle the Exit event.12. Save the VI.1

“Exit”: Value Change event
—Right-click the Event structure border and select
Add Event Case
. In the Event Sources section of the Edit
Events window, click the
Controls»Exit
and in the Events section select
Value Change.
2
Exit
control
—Move this control inside the event case.
3
Wire the tunnels
—This case does not update or read the acquisition data.
4
True constant
—This causes the Exit event case to stop the While Loop.
5
Event Tunnel
—Wire the True constant through an event tunnel to the OR function. Make sure that when right-clicking the tunnel, the
Use
Default If Unwired
option is enabled, which means that any case with no constant wired defaults to False.
1
2
3
4
5
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-16 | ni.com
Test the VI
1. Run the VI.
2. Set the following control values.
3. Click the Acquire button. Verify that acquisition data appears on the Graph.
4. Click the Analyze button. Verify that a dialog window appears showing analysis
data.
5. Click the Save Data button. Verify that a file dialog appears and that the log file is
created.
6. Click the Generate Stimulus button. Verify that a file dialog appears and that the
Analog Output channel signal is updated.
7. Click the Clear button. Verify that the VI clears the Graph.
8. Click the Exit button. Verify that the VI exits.
Your Turn
1. Add a new control.
2. Configure an event for the control.
3. Add code that executes each time the event occurs.
4. Test if your new code executes as expected.
On the Job
Do you have any UI event-based applications? If so, describe the desired event-based
functionality for the application.
End of Exercise 2-1
AI Voltage Channel PCI 6221/ai0, PCI 6221/ai3
```
Sample Rate (Hz) 1000
```
Samples per channel 100
AI Voltage Channel PCI 6221/ao0
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-17
Caveats and Recommendations
• Use a Value Change event to detect value changes.
• Keep event handling code short and quick.
• Place Boolean control terminals inside an event case for latched operations to work
properly.
UI Event Handler Design Pattern Logic
The state diagram in the following figure shows the logic of the User Interface Event
Handler design pattern.
This design pattern waits for an event and when an event occurs, the VI will execute
the corresponding code to handle the event. Then the VI goes straight back into
waiting for an event again.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-18 | ni.com
What if you wanted more complicated state diagram logic?
What if you wanted more complicated state diagram logic to handle an event, such as
the logic shown in the following figure?
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-19
C. Event-Driven State Machine Design Pattern
This section discusses a powerful and flexible design pattern called the Event-Driven
State Machine design pattern.
Event-Driven State Machine
The Event-Driven State Machine design pattern combines the User Interface Event
Handler design pattern with the flexible transitions of the State Machine design
pattern.
This design pattern allows you to have an event-driven application that can respond
to events by executing more flexible state diagram logic.
To do this, the Event-Driven State Machine design pattern uses a state machine that
includes a Wait for Event state. The purpose of the Wait for Event state is to wait for
an event to occur and then transition to the corresponding state that will handle the
event.
So the Wait for Event state contains an Event structure, which waits for its configured
events. When one of those events occurs, the Event structure passes the
corresponding next state to the state shift register of the state machine.
```
Demonstration: Event-Driven State Machine
```
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-20 | ni.com
Exercise 2-2: Event-Driven State Machine
Goal
In this exercise you will configure the VI that uses the Event-Driven State Machine
design pattern and explore its limits and the caveats. After that you will analyze the
Event-Driven State Machine template provided by LabVIEW.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
You will use an unconfigured Event-Driven State Machine the front panel of which is
shown in the following figure.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-21
The following table lists the events in this application and their corresponding state
diagram logic.
Examine the state diagram for this application in the following figure.
This application uses the Event-Driven State Machine design pattern for the following
reasons.
• This application is event-driven. The user will click many buttons while the
application is running, and those Value Change events must trigger the
corresponding code to execute.
• The code that corresponds to Value Change events can be described by a state
diagram.
Event State Diagram Logic
“Acquire”: Value Change Acquires data, analyzes the data, logs data if
it exceeds the threshold, updates the graph,
and then waits for another event.
“Clear”: Value Change Clears the graph data, and then waits for
another event.
“Generate Stimulus”: Value
Change
```
Generates either 5V (ON position) or 0V (OFF
```
```
position) at the selected analog output, and
```
displays a dialog box informing the user about
it, and then waits for another event.
“Exit”: Value Change Exits the application.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-22 | ni.com
Guided Instruction
In this section, you will implement the state transition logic described by the arrows
in the previous figure.
1. Open C:\Exercises\LabVIEW Core 2\Event-Driven State
Machine\Event-Driven State Machine.lvproj.
2. From the Project Explorer window, open the Event-Driven State Machine VI.
3. Examine the front panel. In this application, clicking the buttons described in the
table on the first page will execute the corresponding code.
4. Examine the Event-Driven State Machine design pattern.
- Explore the block diagram and notice the state machine components as shown
in the following figure.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-23
Question 1 -
What is the first case that this VI will execute?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________1

While Loop
2
Type Definition enum
—Click on this enum and notice that it contains all the states described in the state diagram shown in the previous
figure.
3
Case structure
—Click on the Case Selector and notice that there is a case for every state described in the state diagram shown in the
previous figure.
4
Cases
—Each case contains both state code and the state transition code.
5
State Machine Data
—The Type Definition cluster constant defines the state machine data. The shift register stores the data and allows
multiple states to access and modify the data.
1
3
4
52
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-24 | ni.com
5. Examine the Initialize case.
Question 2 - What case will the next iteration of the While Loop execute after the
Initialize case?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
6. Examine the Wait for Event case. This case exists in every application based on
the Event-Driven State Machine design pattern.
- Notice that this case contains an Event structure.
- Based on the state transition diagram, what events do you expect to see
defined in the Event structure?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
- Click the event selector of the Event structure to view the defined event cases.
- Based on the state transition diagram, write the state transition enum value
you need in each event case.
Event Case
States Enum Value
```
(Initialize, Wait for Event, Acquire,
```
Analyze, Log, Clear, Update Graph, Update
```
Stimulus, Exit)
```
“Acquire”: Value Change
“Clear”: Value Change
“Generate Stimulus”: Value Change
“Exit”: Value Change
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-25
- In the Project Explorer window expand support folder, and drag the States.ctl
enum to the following event cases on the block diagram. Set this enum to the
```
values (Acquire, Update Stimulus, Clear, Exit) shown in the following figures.
```
This defines which state the state machine will transition to next.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-26 | ni.com
7. Define what happens when you click the Acquire button.
- As seen in the state transition diagram, when you click the Acquire button, the
next iteration of the While Loop will execute the Acquire case.
- Go to the Acquire case of the Case structure, which corresponds to the
Acquire state in the state transition diagram.
- Based on the state transition diagram, which state should the state machine
go to after the Acquire state? _____________
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-27
- Modify the Acquire case to go to the Analyze state next, as shown in the
following figure.
- Which state should the state machine go to after the Analyze state?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
- Modify the Analyze case to go to either the Log or Update Graph state next,
as shown in the following figure.
- Which state should the state machine go to after the Log state?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-28 | ni.com
- Modify the Log case to go to the Update Graph state next, as shown in the
following figure.
- Which state should the state machine go to after the Update Graph state?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
- Modify the Update Graph case to go back to the Wait for Events state next,
as shown in the following figure.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-29
8. Define what happens when you click the Generate Stimulus button.
- Examine the Wait for Event state.
– Select the Wait for Event case of the Case structure, and then select the
“Generate Stimulus”: Value Change event case of the Event structure.
– Notice that the enum tells the state machine to execute the Update
Stimulus case next.
- Examine the Update Stimulus state.
– Select the Update Stimulus case of the Case structure.
Based on the state transition diagram, which state should the state
machine go to after the Update Stimulus state?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
- Modify the Update Stimulus case to go back to the Wait for Events state next,
as shown in the following figure.
9. Define what happens when you click the Clear button.
- Examine the Wait for Event state.
– Select the Wait for Event case of the Case structure, and then select the
“Clear”: Value Change event case of the Event structure.
– Notice that the enum tells the state machine to execute the Clear case
next.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-30 | ni.com
- Examine the Clear state.
– Select the Clear case of the Case structure.
– Based on the state transition diagram, which state should the state
machine go to after the Clear state?
- Modify the Clear case to go to the Update Graph state next, as shown in the
following figure.
10. Define what happens when you click the Exit button.
- Examine the Wait for Event state.
– Select the Wait for Event case of the Case structure, and then select the
“Exit”: Value Change event case of the Event structure.
– Notice that the enum tells the state machine to execute the Exit case next.
- Examine the Exit state.
– Select the Exit case of the Case structure.
– Notice that this case outputs a True constant that stops the While Loop
and exits the application.
– Even though the application will exit after the Exit case, you still need to
wire a value into the enum output tunnel of the Case structure to ensure
that the output tunnel value is defined in all cases.
– Modify the Exit case to wire an Exit enum value to the enum output tunnel,
as shown in the following figure, even though the state machine will exit
immediately after the Exit case.Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-31
11. Examine how the state machine allows multiple states to access the State
Machine Data cluster data.
- Notice that the Acquire, Analyze, Log, Clear, and Update Graph states all
write to or read from the Acquisition Data element of the State Machine Data
cluster.
- Notice how the Wait for Event»”Generate Stimulus”: Value Change and
Update Stimulus states both access the Stimulus Value element of the State
Machine Data cluster.
12. Save the VI.
Test
1. Run the VI.
2. Set the controls to the following values.
3. Click the Generate Stimulus button to set it to True.
4. If you have a real DAQ device, the analog output channel should now be
outputting 5 V.
5. Click the Acquire button.
AI Voltage Channel PCI-6221/ai0, PCI-6221/ai2:3
```
Sample Rate (Hz) 1000
```
Samples per channel 100
```
Threshold (rms) 1
```
AO Voltage Channel PCI-6221/ao1
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-32 | ni.com
- Verify that the graph indicator displays the acquired data.
- If necessary, adjust the Threshold (rms) value to a low enough number, so that
the acquired data is above the threshold. Click Acquire again. This will cause
the VI to log the data to a file.
- In Windows Explorer, navigate to the C:\Exercises>\LabVIEW Core 2\
Event-Driven State Machine directory. Notice that a log file is created each
time the acquisition data exceeds the threshold.
6. Click Clear button.
- Verify that the VI clears the graph.
7. Click the Exit button.
- Verify that the VI exits.
Explore Limits/Caveats of Event-Driven State Machine Design
Pattern
The Event-Driven State Machine design pattern is good for applications where users
click controls on the front panel to trigger corresponding code to execute and the code
logic can be described by a state diagram. This design works best when the
corresponding code duration is short.
```
If the code duration is long, such as 10 seconds, that means the user interface (front
```
```
panel) will appear unresponsive to the user for those 10 seconds.
```
Explore what happens when corresponding code duration is long.
1. Modify the Analyze case code execution duration to be 10 seconds.
- Add a Wait (millisecond) node in the Analyze case. Right-click the input and
select Create»Constant. Set the constant to 10000.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-33
2. Examine the behavior of the VI.
- Run the VI.
- Click the Acquire button.
This causes the state machine to go into the Acquire case and then the
Analyze case, which will execute for 10 seconds.
- Click the Clear button.
```
Usually, the Clear button would show a latching mechanical action (ON, and
```
```
then reset back to OFF). Notice that the Clear button appears unresponsive
```
```
because it appears like it is still pressed (ON).
```
This happens because the code is still in the Analyze case. When the code
eventually goes back to the Wait for Event state, it will read the Clear button
click in the “Clear”: Value Change event case, and the Clear button switches
back off.
The code to clear the graph will then execute.
- Click Exit to stop the VI.
3. Delete the Wait node from the block diagram to return to the original behavior of
the VI.
There are two techniques to solve this problem and make the user interface still appear
responsive while code is taking a longer time to execute. You will learn about these
techniques later.
• Method 1: If code is taking a longer time to execute, disable controls to let the
user know that the use of those controls id impossible. When the code is done
executing and the application can once again process events, then re-enable those
controls.
```
• Method 2: Use a design pattern based on the Producer/Consumer (Events) design
```
pattern. This design pattern uses two loops:
– Loop 1: Handle events to keep the user interface responsive.
– Loop 2: Execute the code that corresponds to the events.
Explore an Event-Driven State Machine Template
LabVIEW includes an Event-Driven State Machine template. Open the template by
following these steps:
1. Open LabVIEW.
2. From the Getting Started window click the Create Project button.
3. Select Simple State Machine from the list and click Finish to create a project based
on an event-driven state machine.
4. Explore the project.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-34 | ni.com
Your Turn
Try making the following improvements to the application that you created in this
exercise.
Challenge #1
When developing an application that outputs signals, you should ensure that the
application sets the outputs to a safe value when the application exits.
```
Modify this VI, so that the Exit case sets the analog output channel (PCI-6221/ao1)
```
to 0 V.
Challenge #2
Modify this VI, so that every time the VI starts executing, the VI initializes the
Generate Stimulus control to False.
Refer to theChallenge Hints section at the end of this exercise if you need a hint.
On the Job
Do any of your applications have a need for an event-driven state machine? If so, draw
the state diagram for the application below.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-35
Challenge HintsChallenge #1Method 1 - Shift Register:
Add an AO Voltage Channel item to the State Machine Data shift register, so you can access the most current
```
AO Voltage Channel in multiple event cases (Generate Stimulus, Exit).Method 2 - Local Variable:
```
Use a local variable in the Exit case to access the current value of the AO Voltage Channel control. Using duplicate
terminals during initialization or shutdown generally does not result in race conditions if you properly sequence application.Challenge #2Use a local variables in the Initialize case to initialize the value of the Generate Stimulus control.Refer to the
```
C:\Solutions\LabVIEW Core 2\Exercise 2-2 (Challenge Solution)
```
for the solution code.
AnswersQuestion 1 - Answer:
The first case this VI executes is the Initialize case. Notice that the enum shift register is initialized with Initialize.
Question 2 - Answer:
The next case the While Loop executes is the
Wait for Event
case.
End of Exercise 2-2
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-36 | ni.com
Simple State Machine Project TemplateLabVIEW includes a template for the Event-Driven State Machine design pattern. Open this template by navigating to
File»Create Project
,
then click Simple State Machine from the Templates section. You can do this either from the Getting Started window, from the ProjectExplorer window or from a VI.Caveats—Event-Driven State MachineNow let’s take a look at a caveat and potential problem with the Event-Driven State Machine.What would happen if a UI event triggers code that has a duration of 30 seconds?Will the UI remain responsive while that 30 second event-handling code executes?Demonstration: Event-Driven State Machine Caveat
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-37
D. Producer/Consumer (Events) Design Pattern
```
This section discusses the concept of the Producer/Consumer (Events) design pattern.
```
Message Communication Example
You can use message communication to transfer messages between loops, and each
message might also include message data that can use whatever is the most
appropriate data type.
For example, every time a user clicks a Process Data button, the application can send
a message that includes the data to process to a separate processing loop.
In the message communication example in the following figure, Loop 1 is sending both
a message and message data to Loop 2.
• When the application starts running, Loop 1 sends an Initialize string message
and a numeric 0 as the corresponding message data.
• Later on, Loop 1 sends a Process message along with the message data, 100, to
process.
• Then the application wants to log some data, so Loop 1 sends a Log message
along with the log data, 50, to write to file.
• These messages can get queued up if the receiving loop is busy, so the receiving
loop can process the messages in the order received.
This example shows some common characteristics of message communication:
• Intermittent—Loop 1 sends messages intermittently as events occur.
• Structured data—The transferred data contains both a “Message” and “Message
Data”.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-38 | ni.com
```
Message Implementation—Producer/Consumer (Events)One way to implement message communication is to use the Producer/Consumer (Events) design pattern.•
```
Channeled data type definition cluster
—First, we will send our messages and message data to the Producer Loop and Consumer Loop,
by using a channel wire. We can make our channel element data type a type definition cluster that contains a string for the message,and an integer for the message data.
•
Producer Loop
—The purpose of the Producer Loop is to send a message and its message data when an event occurs, and to keep the
user interface responsive. The Producer Loop waits for an event to occur using an Event structure. Each event case just sends themessage and message data, that corresponds to the event, to the Consumer Loop. Because the code in the event cases do not do anyintensive processing, the Event structure in the Producer Loop is always ready to respond to the next event.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-39
• Consumer Loop—The purpose of the Consumer Loop is to read and process
messages along with their message data. The Consumer Loop reads messages
from the message queue, which then passes to the Case structure. The Case
structure then executes the subdiagram that matches the message. The Case
structure also uses the Variant To Data function to extract the message data.
The subdiagrams of the Case structure contain the code necessary to process all
the messages. After the Case structure is done processing the message, the
Consumer Loop goes to the next iteration, and reads and processes the next
message in the message queue.
```
The Producer/Consumer (Events) design pattern uses Message Queue VIs which
```
conveniently provide built-in message and data inputs and outputs. Also, each
message can contain data of an arbitrary type in the message data variant.
```
Producer/Consumer (Events) design pattern summary
```
• The Producer Loop continuously keeps the UI responsive.
• The Consumer Loop executes the code corresponding to the UI events in parallel.
• These loops implement message communication using a channel wire.
```
Demonstration: Concept: Producer/Consumer (Events)
```
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-40 | ni.com
```
Exercise 2-3: Producer/Consumer (Events)
```
Goal
```
Explore an example using the Producer/Consumer (Events) design pattern.
```
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
```
You have a VI that uses the Producer/Consumer (Events) design pattern to process
```
messages.
Guided Instruction
1. Open C:\Exercises\LabVIEW Core 2\Producer Consumer (Events)\Producer
```
Consumer (Events).lvproj.
```
2. From the Project Explorer window, open the Main VI.
3. Run the VI.
4. Set the Sample Rate control value.
5. Click the Generate button.
- Notice the Current Consumer State indicator displays Generate Signal
message.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-41
- Notice that the Waveform Graph indicator displays the generated signal and
the Actual Sample Rate indicator displays the sample rate of the generated
signal.
- Notice that the RMS Result and the Threshold Exceeded indicators haven't updated
yet.
6. Change the Sample Rate control value and click the Generate button again.
- Notice that the Actual Sample Rate indicator updated to show the sample rate
that you set.
7. Set the Threshold control value.
8. Click the Analyze button.
- Notice that Current Consumer State indicator displays the Analyze Signal
message.
- Notice that the RMS Result indicator shows the RMS value of the generated
signal.
- Notice that depending on the Threshold control value, the Threshold
Exceeded? indicator will also update to show if the RMS value is over the
threshold value or not.
9. Click the Exit button to stop the execution.
10. Inject an error in the Producer Loop, and see what happens.
- Navigate to the “Generate Signal”: Value Change event case.
- Add an Error Cluster From Error Code VI on the block diagram, as shown in
the following figure.
- Right-click the error code (0) input and select Create»Constant.
- Set the constant to –1.
- Wire the error out output to the output tunnel of the Event structure in the
“Generate Signal”: Value Change event case.
The Error Cluster From Error Code VI will now pass an error with a code of -1
on its error out output.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-42 | ni.com
- Run the VI again and click the Generate button.
- Notice that the VI does not behave properly anymore. This is because an error
in the Producer Loop has caused the Consumer Loop to shut down.
- Because the Consumer Loop was doing the bulk of the work, the VI no longer
behaves correctly. The Producer Loop is still running.
11. Close the VI and the project. Do not save your changes.
This VI does not include any error handling.
End of Exercise 2-3
```
Caveats—Producer/Consumer (Events)
```
What happens if an error occurs in the Producer Loop?
In this VI, the Producer Loop will exit, and as a result, no more messages will be sent.
But the Consumer Loop will keep running and waiting for messages because it doesn’t
know an error has occurred.
What Happens if an Error Occurs in the Consumer Loop?
In this VI, the Consumer Loop will exit. But the Producer Loop will keep running
because it doesn’t know that an error has occurred in the Consumer Loop. As a result,
the Producer Loop will wait for events and send messages, but none of the messages
will be read because the Consumer Loop has already exited.
In the next section, we will look at how the Channeled Message Handler design
pattern fixes these problems.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-43
E. Channeled Message Handler (CMH) Design PatternThis section discusses the CMH design pattern, which is an improvement over the Producer/Consumer (Events) design pattern and solvessome of its problems.Channeled Message Handler Design PatternThe Channeled Message Handler (CMH) template facilitates multiple sections of code running in parallel and sending data between them.Each section of code represents a task, such as acquiring data, and is designed similarly to a state machine. Because of this design, you candivide each task into states.The CMH template is a version of the Producer/Consumer design pattern, where the user interface (producer) produces messages and thetasks (consumers) consume them. However, in the CMH template, you also can also have the consumer loop generate messages for itself.This template includes one producer loop and one consumer loop. You can add consumer loops as needed.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-44 | ni.com
Channeled Message Handler Documentation
Explore the Channeled Message Handler Documentation included in the project to
learn how you can modify this template based on your needs.
Channeled Message Handler Design Pattern
The Channeled Message Handler design pattern is similar to the Producer/Consumer
```
(Events) design pattern.
```
• Both use channel wire to transfer messages.
• Both have a “Producer” or “Event Handling” loop that streams Message and
Message Data when an event occurs.
• Both have a “Consumer” or “Message Handling” loop that reads and processes the
Message and Message Data.
Better error handling
– Handles errors separately for the producer loop and consumer loop. Exits the
application if an error occurs in the consumer loop.
– Allows you to configure specific errors to ignore in each loop.
```
Demonstration: Channeled Message Handler Design Pattern
```
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-45
Exercise 2-4: Channeled Message Handler
Goal
Explore an example using the CMH design pattern.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
You have a VI that uses the CMH design pattern to process messages, like the
```
Producer/Consumer (Events) LabVIEW project in the previous exercise.
```
Guided Instruction
1. Open C:\Exercises\
LabVIEW Core 2\Channeled Message Handler\Channeled Message
Handler.lvproj.
2. From the Project Explorer window, open the Main VI.
3. Explore the Message Queue VIs included in this project.
- In the Project Explorer window, expand the Support VIs folder, notice the
Message Queue VIs under the Message Queue LabVIEW library.
- These three VIs are used in the Main VI block diagram.
– Enqueue Message
– Dequeue Message
– Abort Message Queue
- Switch to the block digram of the Main VI.
- Open the Context Help window.
- Notice that the Enqueue Message and Dequeue Message VIs have message
```
(string data type) and data (variant data type) terminals.
```
- If you look at the block diagrams of the Message Queue VIs, you will see that
```
these VIs use the channel wire writer and reader endpoints (in this case —
```
```
messenger channel).
```
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-46 | ni.com
4. Examine the block diagram similarities of the CMH design pattern compared to the
```
Producer/Consumer (Events) design pattern from the previous exercise.
```
- The Event Handling Loop in the CMH design pattern is similar to the Producer
```
Loop in the Producer/Consumer (Events) design pattern.
```
- The Message Handling Loop in the CMH design pattern is similar to the
```
Consumer Loop in the Producer/Consumer (Events) design pattern.
```
5. Explore how the CMH behaves if an error occurs in the Event Handling Loop.
- Imagine an error occurs in the Event Handling Loop. The error will be passed
into the Error Handler - Event Handling Loop VI.
- Double-click the Error Handler - Event Handling Loop VI to open its block
diagram.
- Examine the block diagram of this VI to explore how it handles the error. This
VI passes the error into the Check Loop Error VI.
- Notice that the Exit on Error? input of the Check Loop Error VI isn't wired, so
we are not passing any value to it.
- Double-click the Check Loop Error VI to open its block diagram.
- Notice that the Exit on Error? control will read default False value when this VI
executes. This means that the Check Loop Error VI will enqueue an Error
message along with the error message data on the message channel.
Note If the error is listed in the Ignore Errors array, the Check Loop Error
VI will ignore the error and do nothing.
- Go back to the Main VI block diagram.
Because the error handling VIs enqueued an Error message, the Dequeue
Message VI in the Message Handling Loop now dequeues the Error message
and the error message data.
This causes the inner Case structure of the Message Handling Loop to execute
the Error case.
- The Error case displays an error dialog using the Simple Error Handler VI.
6. Explore how the CMH handles shutting down both loops if an error occurs in the
Message Handling Loop.
- Imagine an error occurs in the Message Handling Loop. The error will be
passed into the Error Handler - Message Handling Loop VI.
- Examine the block diagram of this VI to explore how it handles the error. This
VI passes the error into the Check Loop Error VI.
- Notice that now a true boolean constant is wired to the Exit on Error? terminal
of the Check Loop Error VI.
- Open the block diagram of the Check Loop Error VI.Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-47
- Based on the value of the Exit on Error? control (which is TRUE), the
corresponding Case structure executes the Abort Message Queue VI instead
of queuing an Error message.
- Now open and examine the block diagram of the Abort Message Queue VI.
Abort Message Queue VI will enqueue an Exit message along with the error
message data on the message channel. It also wires the TRUE boolean
constant to the abort terminal of the Messenger channel writer endpoint.
- Go back to the Main VI block diagram.
Because the Error Handler - Message Handling Loop VI enqueued an Exit
message, the error message data, and the abort terminal’s value, the Dequeue
Message VI dequeues the same data: Exit message, the error message data,
and the true value from the channel aborted terminal.
- Channel aborted output of the Dequeue Message VI passes the true value to
the conditional terminal of the outer Case structure.
- The True case performs the following actions.
– Displays an error dialog using the Simple Error Handler VI.
– Writes Exit Application message to the Current Consumer State
indicator.
– Uses the Write VI to tell the Event structure in the Event Handling Loop to
execute the <channel value>: User Event event case next.
– Sends a True value to the Condition terminal, which stops the Message
Handling Loop.
Note To learn more about this technique, refer to the following Events
Functions topics in theLabVIEW Help: Create User Event,Register For
Events,Generate User Event, andDestroy User Event.
- Select the <channel value>: User Event event case in the Event Handling
Loop. Notice that this case sends a True value to the conditional terminal,
which stops the loop.
7. Test how the CMH handles an error in the Message Handling Loop.
- Select the Generate Signal case in the Message Handling Loop.
Delete the error wire between the Variant To Data function and the Merge
Errors function.
- Add an Error Cluster From Error Code VI to the block diagram as shown in the
following figure.
- Right-click the error code input and select Create»Constant.
- Set the constant to –1.
- Wire the error out output of the Error Cluster From Error Code VI to the Merge
Errors function.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-48 | ni.com
- Run the VI.
- Click Generate.
Notice that the VI handles the error by exiting.
- To follow the flow of data, run the VI again.
- Turn on the execution highlighting
- Click Generate, and follow the flow of data on the block diagram.
- When finished, change the Generate Signal case back to its original code.
8. Test how the CMH handles an error in the Event Handling Loop.
- Select the “Generate Signal”: Value Change event case in the Event Handling
Loop.
- Add an Error Cluster From Error Code VI on the block diagram, as shown in the
following figure.
- Right-click the error code input and select Create»Constant.
- Set the constant to –1.
- Wire the error out output of the Error Cluster From Error Code VI to the error
in input of the Error Handler — Event Handling Loop VI.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-49
- Run the VI.
- Click Generate.
Notice that the VI handles the error by displaying an error dialog.
- To follow the flow of data, run the VI again.
- Turn on the execution highlighting and click Generate again.
Follow the flow of data on the block diagram.
- When finished, change the “Generate Signal”: Value Change event case back
to its original code.
9. Close the VI and the project.
Explore a Channeled Message Handler Template
LabVIEW 2020 will include a Channeled Message Handler template.
Follow the instructions below to use that template in LabVIEW 2019.
1. Navigate to C:\Exercises\LabVIEW Core 2\Channeled Message Handler
Template directory.
2. Copy the Channeled Message Handler folder into this directory:
```
C:\Program Files (x86)\National Instruments\LabVIEW 2019\
```
ProjectTemplates\Source\Core.
3. Install the Channeled Message Handler.xml file into this directory:
```
C:\Program Files (x86)\National Instruments\LabVIEW 2019
```
\ProjectTemplates\MetaData.
4. Go to the Getting Started window.
5. Select File»Create Project.
6. In the Templates page, select Channeled Message Handler and click Finish.
7. Close the project without saving when finished.
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-50 | ni.com
On the Job
Do any of your applications require using the CMH design pattern because the
Event-Driven State Machine design pattern does not meet the application
requirements?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
If so, continue to study the Channeled Message Handler design pattern.
End of Exercise 2-4
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-51
```
Activity: Lesson Review
```
1. What are the advantages of events over polling?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
2. The logic for your application is represented by the following state transition
diagram. Which design pattern should you use?
a. UI Event Handler
b. Event-Driven State Machine
c. Producer/Consumer (Events)
d. Channeled Message Handler
3. Your application contains a 30-second process. While the application is running
executing this process, you want the application to continue keeping the UI
responsive.
Choose appropriate design pattern.
a. UI Event Handler
b. Event-Driven State Machine
c. Producer/Consumer (Events)
d. Channeled Message Handler
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-52 | ni.com
4.

Which of the following design patterns exits the application if an error occurs in the consumer loop?
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 2-53
```
Activity: Lesson Review – Answers
```
1. What advantages does using events have over polling?
Requires much less CPU usage
Guarantees that VI will detect and respond to all value changes
Simplifies block diagram code
2. The logic for your application is represented by the following state transition
diagram. Which design pattern should you use?
a. UI Event Handler
b. Event-Driven State Machine
c. Producer/Consumer (Events)
d. Channeled Message Handler
3. Your application contains a 30-second process. While the application is running
executing this process, you want the application to continue keeping the UI
responsive.
Choose appropriate design pattern.
a. UI Event Handler
b. Event-Driven State Machine
c. Producer/Consumer (Events)
d. Channeled Message Handler
Copyright 2020 National Instruments
Lesson 2 Creating an Event-Driven User Interface
2-54 | ni.com
4. Which of the following as-is can handle shutting down both loops if an error occurs
in either loop?
Copyright 2020 National Instruments
3
Controlling the
User Interface
In this lesson, you will learn to use Property Nodes and
control references to programmatically control front panel
objects.
Topics
A. VI Server Architecture
B. Property Nodes and Control References
C. Invoke Nodes
Exercises
Exercise 3-1 Property Nodes and Control References
Exercise 3-2 Customize the VI Window
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-3
A. VI Server Architecture
Describe the purpose of the VI server and the class hierarchy of properties and
methods.
VI Server Purpose and Use
The VI Server provides programmatic access to LabVIEW and LabVIEW applications.
The VI Server performs many functions and in this lesson concentrates on how to use
the VI Server to control front panel objects and edit the properties of a VI in LabVIEW.
You can use the VI server to perform the following actions:
• Programmatically control front panel objects and VIs
• Dynamically load and call VIs
• Run VIs on a computer or remotely across a network
```
• Programmatically access the LabVIEW environment and editor (VI Scripting)
```
VI Server—Class Hierarchy
VI server has an object-oriented architecture that is platform-independent. Each object
that is a part of VI server is a part of a class. The class that the object is a part of
determines what an object can do, what operations, or methods, it can perform, and
what properties it has.
Objects can be things like a Stop button, a Push button, a numeric control, or an array.
Front panel objects inherit their properties from the Control class. This class has
subclasses where the objects are defined by their data type. For example, a Stop
button is an object of the Boolean sub-class of the Control class.
Properties
Now that we understand the basics of the VI server class hierarchy, let’s discuss how
we can use the VI server to modify a front panel object.
Properties are single-valued attributes of the object, such as an its color, position, size,
visibility, label text, and label font.
Properties can be read and write, read only, or write only.
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-4 | ni.com
VI Server—Class Hierarchy
Let’s take another look at the class hierarchy that we saw a few moments ago.
The Stop button inherits the properties associated with the Boolean class, which in
turn, inherits properties from the Control class. This is useful because you can rely on
the Stop button having the Visible property from the Control class. Think of a class
hierarchy as a template for defining states and behaviors that are common to objects.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-5
B. Property Nodes and Control References
Describe how to create Property Nodes and control references and explain execution
order.
Property Nodes
A Property Node reads and/or writes the properties of an object, allowing you to
programmatically change them.
Some of the ways you can use Property Nodes include the following actions:
• Read and write the properties of an object
• Make modifications programmatically
• Use Context Help to get information about properties
Implicitly and Explicitly Linked Property Nodes
You can either create an implicitly linked Property Node of front panel object or create
control references of front panel objects to programmatically control them.
Two Types of Property Nodes
Implicitly Linked
Explicitly Linked
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-6 | ni.com
Creating Property NodeYou can create a Property Node from an object by right-clicking it, selecting
Create»Property Node
, and selecting a property from the shortcut
menu. This creates a Property Node on the block diagram that is implicitly linked to the front panel objects.You can right-click the property and select
Change to Write
or
Change to Read
to change the operation of a property.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-7
Creating Control ReferenceCreate control references of an object to programmatically control them. When the Property Node has a reference input and the nodedetermines which object it will operate on then it is an explicitly linked node.Demonstration: Create a Property Node
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-8 | ni.com
Property Node Execution OrderProperty Nodes are expandable and can have multiple properties.Property Nodes execute from top to bottom.The first time this node executes, the old value for the tip strip is read and passed to the indicator. The new value is written, but not readbecause Property Nodes execute from top to bottom, and the write terminal executes after the read terminal.If you run the VI again, the tip strip string: “This is a numeric control.” displays.Property Node ErrorsIf an error occurs on a terminal, the node stops at that terminal, returns the error, and does not execute the remaining terminals.The outputs return the default value for the data type.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-9
Exercise 3-1: Property Nodes and Control References
Goal
Use Property Nodes and control references to change the properties of front panel
objects programmatically.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
When you acquire data, you want to ensure that the front panel controls remain
unchanged during the acquisition. Use references and Property Nodes to
programmatically disable the controls to prevent them from being changed while the
VI is acquiring data. When the acquisition is complete, re-enable the controls.
Guided Instruction
Part 1—Disable Controls
1. Open C:\Exercises\LabVIEW Core 2\Property Nodes\Property Nodes.lvproj.
2. From the Project Explorer window, open the Event-Driven State Machine Property
Nodes VI.
3. Run the VI and then click the Acquire button.
- Notice that while the acquisition occurs, the controls are still enabled. You can
change the values on the controls during the acquisition.
- Click the Exit button.
4. Create control references for each of the front panel controls you want to disable
during acquisition.
On the front panel, press <Shift> and select all of the following controls and then
right-click the selection and select Create»Reference.
• AI Voltage Channel
```
• Sample Rate (Hz)
```
• Samples per channel
```
• Threshold (rms)
```
• AO Voltage Channel
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-10 | ni.com
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-11
5.

Modify the block diagram as shown in the following figure to disable the controls when the VI is performing an acquisition.*
Complete block diagram wiring as shown.
1
Select the
Wait for Event
case.
2
Select the
“Acquire”: Value Change
event.
3
Move all the control references into the
“Acquire”: Value Change
event case.
4
Build Array
—Use this function to combine the control references so you can use a single Property Node to disable them during
acquisition.
5
For Loop
—Wire the array of control references through a For Loop.
6
Property Node
—Add a Property Node inside the For Loop, set it to write by right-clicking the Property Node and selecting
Change All
To Write
. Connect the array of control references and error output to the Property Node. After that, select the Disabled property from
the drop-down list. Then right-click the Property Node input and select
Create»Constant
and set the enum constant to
Disabled
.
7
Make sure the error wire is connected through a shift register on the For Loop.
1
3
4
2
5
6
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-12 | ni.com
Test1.

Run the VI and click the
Acquire
button. Notice that the controls are disabled.
2.

Click
Exit
to stop the VI.
3.

Run the VI again and notice that the controls are still disabled.
Part 2—Enable ControlsYou want to disable the controls during the acquisition, but re-enable them when the acquisition is complete.1.

Modify the block diagram as shown in the following figure to enable the controls in the Update UI case.
1
Select the
Update UI
case.
2
Create copies of the control references and place them in the
Update UI
case.
3
Build Array
—Combine the control references into an array.
4
For Loop
—Place a For Loop and wire the array into it.
5
Property Node
—Add a Property Node inside the For Loop, set it to write by right-clicking the Property Node and selecting Change All
To Write. Connect the array of control references and error output to the Property Node. After that select the
Disabled
property from
the drop-down list. Then right-click the Property Node input and select
Create»Constant
and set the enum constant to
Enabled
.
6
Make sure the error wire is connected through a shift register on the For Loop.
2
1
3
4
5
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-13
Test
1. Run the VI and click the Acquire button.
2. Notice that the controls are disabled for the duration of the acquisition and then
re-enabled when the acquisition is complete.
End of Exercise 3-1
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-14 | ni.com
C. Invoke Nodes
Explore how to use Invoke Nodes to perform actions on controls of VIs.
Invoke Nodes
Use Invoke Nodes to call methods on objects, such as Export Image, for a waveform
chart. An Invoke Node can only call one method for an object.
Most methods have parameters. If the background of a parameter is grayed out, then
that method parameter is optional.
Use the Context Help window to get information on methods.
As with Property Nodes, there are two types of Invoke Nodes: implicitly linked and
explicitly linked.
```
Demonstration: Creating an Invoke Node
```
VI Server Methods
You can use a VI server reference to associate an Invoke Node with the current VI.
If the Invoke Node reference input is unwired and the class is set to VI, then by default
the method will operate on the current VI.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-15
Exercise 3-2: Customize the VI Window
Goal
Further affect the attributes of a VI by using Property Nodes and Invoke Nodes.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
You can set the appearance properties of a VI statically by using the VI properties
page. However, robust user interfaces commonly modify the appearance
of a front panel while the program is running.
Modify the VI to have the following appearance and behaviors when the VI is running:
• Hide the tool bar
• Hide the menu bar
• Hide the scroll bars
• Move to the center of the screen
Design - Properties
Use the following properties and methods on the VI Class:
• Front Panel Window:Show Menu Bar - When this property is False, the menu bar
of the VI is not displayed.
• Tool Bar: Visible - When this property is false, the tool bar of the VI is not
displayed.
Design—Methods
Unlike properties, a method has an effect every time you call it. Therefore, you should
call methods only when you want to perform an action. For example, if you call the
Front Panel:Center method during each iteration of a loop, the VI is continually
centered, thereby preventing the user from moving it. You can use a Case structure
to control calling the method in a given iteration of a loop. Use the following method
on the VI class:
• Center - Each time this method is called, the VI moves to the center of the screen.
Tip Use the Context Help window to view descriptions of each property
and method.
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-16 | ni.com
After you implement the changes to the VI, when you run the Temperature Limit VI, it should move to the center of the screen and looksimilar to the figure below.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-17
##### ImplementationSet Appearance Properties1.

Open
```
C:\Exercises\LabVIEW Core 2\Customize the VI Window\Cuztomize the VI Window.lvproj
```
.
2.

From the
Project Explorer
window, open the Event-Driven State Machine - VI Window Customization VI.
3.

Modify the block diagram as shown in figure below to hide the scroll bars, menu bar, and tool bar, and center the front panel on thescreen while the VI is running.
1
Property Node
—Press the <
Ctrl-Space
> keys to display the Quick Drop dialog box. Search and place Property Node. Right-click the
Property Node and select
Link to»Pane
.
•
Right-click and select
Change All to Write.
•
Expand the node to display two properties and set them to
Horizontal Scroll Bar Visibility
and
Vertical Scrollbar Visibility
.
2
Off While Running constant
—Right-click one of the inputs to the Pane Property Node and select
Create»Constant.
3
Property Node
—Right-click the Property Node and choose
Select Class»VI Server»VI»VI.
•
Right-click and select
Change All to Write.
•
Expand the node to display two properties.
•
Click the top property and select
Select Property»Front Panel Window»Show Menu Bar.
•
Click the lower property and select
Select Property»Tool Bar»Visible.
4
Invoke Node
—You must wire the reference from the VI Property Node before setting this method. Click Method and select
Select
Method»Front Panel»Center.
2
1
3
4
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-18 | ni.com
Note Notice that the scrollbar visibility properties apply to the Pane class,
not the VI class. The front panel can be split into multiple panes.
4. Save the VI.
Test
1. Run the VI.
2. Verify that the scroll bars, tool bar, and menu bar are not displayed, and that the
front panel window is centered on the screen while the VI runs.
3. Stop and close the VI.
End of Exercise 3-2
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 3-19
```
Activity: Lesson Review
```
1. Match each VI server term to its definition.
2. What happens if you wire this reference to the control reference input of this
Property Node?
a. The wire breaks due to a type mismatch.
b. The node adapts to the new control type.
c. The control reference adapts to the node class.
d. No change occurs on the block diagram, but this code generates a runtime
error.
3. You can create an implicitly linked Property Node of a front panel object as well
as the control references of front panel objects to programmatically control them.
a. True
b. False
Property a. A specific instance of a class
Class b. Definition of the object type
```
Object c. Attributes of an object (color, plot style, labels, etc.)
```
Copyright 2020 National Instruments
Lesson 3 Controlling the User Interface
3-20 | ni.com
```
Activity: Lesson Review – Answers
```
1. Match each VI server term to its definition.
2. What happens if you wire this reference to the control reference input of this
Property Node?
a. The wire breaks due to a type mismatch.
b. The node adapts to the new control type.
c. The control reference adapts to the node class.
d. No change occurs on the block diagram, but this code generates a runtime
error.
3. What is the order of execution for the Property Node shown below?
a. True
b. False
```
Property c. Attributes of an object (color, plot style, labels, etc.)
```
Class b. Definition of the object type
Object a. A specific instance of a class
Copyright 2020 National Instruments
4
Managing
Configuration
Settings in an
Application
In this lesson, you learn about managing configuration
settings for your application by using a configuration file.
Topics
A. Managing Configuration Settings
B. Managing Configuration Settings Using a Delimited File
C. Managing Configuration Settings Using an Initialization (INI) File
Exercises
Exercise 4-1 Managing Configuration Settings Using an INI File
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-3
A. Managing Configuration Settings
This section, we will describe the different approaches for loading configuration
settings for an application.
What are Configuration Settings?
Configuration settings include any values that must be set before an application can
run correctly.
These values can include:
• Hardware Configuration
• File Paths
```
• Default user interface (UI)
```
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-4 | ni.com
• Default state data, and any other values that you may want to initialize.
Depending on the value, you may only need to set the configuration once or you might
need to change the value based on state changes or user input.
Using Pre-Defined Configuration Settings
If you only need to read configuration values once, you might use constants on the
block diagram to set them once either outside of a loop or in an Initialize case
subdiagram.
Pros
• Quick and easy to implement
• Abstracts configuration values away from the end-user
Cons
On the down-side, this static approach runs into challenges if you come back later and
need to modify the constant values. For example, later on you might need to use
different hardware or want to log to a different file.
• If you set the values in multiple locations based on different states, then you will
have to change the values in each location.
• If you want to change the value while the code is running, you will have to stop
the application, change the constant value, and then re-run the application.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-5
Using User-Defined Configuration Settings
For some configuration values, you might want for the user to set the values before
running the VI or allow the user to change them while the code is running. To do this,
you can create controls on the front panel.
Pros
• Dynamic
• Enables the user to change the configuration values while the VI is running
Cons
• Can result in a very cluttered UI, depending on the number of settings and controls
that you use
• Possibility of user error
Creating Configuration Settings Files
As an alternative to using block diagram constants or front panel controls, you can
use a file to store configuration settings. This file can serve as a single location to set
and modify all of the configuration settings for your application.
• If you need to update values between executions, you can modify the file instead
of having to search for constant values on a VI block diagram to replace.
• By defining these values in a file, you can ensure that any settings that are
dependent upon each other are loaded together, to reduce the chance of user
error.
• If a value is used in more than one location in your application, you can read the
value twice, eliminating the risk of changing a value in one location but forgetting
to change it in another.
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-6 | ni.com
Reading Configuration Data from Different Configuration Files
An additional benefit to reading configuration data from a file is that you can easily
switch between different configuration files.
Each file can contain all of the appropriate settings for a given scenario or hardware
setup.
You can create one file that contains the default values for the application and use a
file path control or a File Dialog Express VI to enable the end-user to choose a different
file.
Storing Configuration Data
File formats for storing configuration data:
• Delimited Files
• INI Files
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-7
B. Managing Configuration Settings Using a
Delimited File
This section discusses how to load configuration settings from a delimited file.
What Is a Delimited File?
A delimited file is a text file that uses some special character to separate columns of
data.
• A tab-delimited file uses tabs to separate data and typically has a TXT file
extension.
• A comma separated file uses commas to separate data and typically has a TXT or
CSV file extension.
Storing Configuration Settings to a Delimited File
Use the delimited spreadsheet VIs to communicate with a delimited file. To store
configuration data, you could use a Write Delimited Spreadsheet VI with a 2D array of
strings to write the configuration data to a delimited file.
In this example, a tab constant is wired to the delimiter input of the Write Delimited
Spreadsheet VI.
Loading Configuration Settings from a Delimited File
Loading configuration data from a file is where we start to see the challenges with this
approach.
We can read the configuration data from the file by using the Read Delimited
Spreadsheet VI, but we must then index the 2D array output to extract the specific
information that we want. Once we extract that information, we must then convert it
to the appropriate data type as shown in the next figure.
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-8 | ni.com
Searching for Specific Configuration Data
If you want to search the 2D string array for the value of a specific configuration
```
setting (otherwise known as a key), you can search for which row in Column 0
```
contains the key name and then return the corresponding key value in that row in
column 1.
For example, if you want to know the value of Sample Rate, the Index Array function
will return all the key names in Column 0, and the Search 1D Array function will search
for the key name Sample Rate and find it in row 2.
Then we will use the Index Array function to return the key value in row 2, column 1,
which contains the key value of 1,000.
Using Delimited Files
A tab or comma delimited file enables you to store configuration data for later
extraction and use in your application.
Pros
• Relatively easy to write and read the file contents as a whole
Cons
• Requires you to develop custom code to extract specific values from the file
– The data will be read as a string, so you will need to convert it if you need to
use it as a numeric.
– If you don’t know the specific row or column for the value, you must
implement custom code to search the 2D string array.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-9
C. Managing Configuration Settings Using an
```
Initialization (INI) File
```
This section discusses how to manage configuration settings using an INI file.
```
Initialization (INI) Files
```
Initialization, or INI, files use a pre-defined format to store values. To create, read, or
```
modify an INI file, use the functions found in the Configuration File (VIs) palette.
```
Structure of an INI File
An INI file has a defined structure.
• Section—A section is a group of related configuration settings, otherwise known
as keys. The INI file as shown in the figure below has an Analog Input section
and an Analog Output section.
• Key—Each key has a name and a value. The INI file as shown in the following
figure contains 4 keys. The key named Samples per Channel has a value of 1,000.
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-10 | ni.com
Storing Configuration Settings to an INI File
The following figure demonstrates writing one key value to an INI file using the Write
Key VI.
In order to write a value to an INI file, you must specify the section, the key, and the
value that you want to write.
The Write Key VI will automatically adapt based on the data type of the data wired to
the value input. In this example, the Write Key VI adapts when a DBL data type is
wired to its value input and then provides additional precision and format inputs. We’re
able to specify the format and precision to determine how to format the DBL into a
string to write to the INI file.
Reading Configuration Settings from an INI File
The code to read data from an INI file is very similar to the code that we previously
used to write that data to the INI file, except that we will now use the Read Key VI
instead.
For each key value that you want to read, you must first specify the section and key
name from which you want to read a value. The Read Key VI reads a value associated
with a key in a specified section in the INI configuration file.
If the key does not exist, the VI returns the default value for the value output and
returns FALSE for the found? output.
Also, in the polymorphic VI selector, you can configure what data type you want the
returned key value to be in LabVIEW. In this example, the Read Key VI is configured
to return a DBL data type.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-11
Using INI Files
An INI file enables you to store and load configuration data for your application.
Pros
• Easy to write and read configuration settings and organize them into sections.
• Write Key and Read Key VIs conveniently have built-in data type conversion and
configuration.
Cons
• Requires you to use one Write Key VI for every key you want to write and one
Read Key VI for every key you want to read so if you need to write or read multiple
keys, you will need to use multiple Write Key or Read Key VIs.
```
Demonstration: Using an INI File to Manage Configuration Data
```
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-12 | ni.com
Exercise 4-1: Managing Configuration Settings Using
an INI File
Goal
Modify a DAQmx-based application to load its hardware configuration settings from
an INI file.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
You developed an application that acquires and generates data, analyzes that data,
and writes to a log file when the analysis determines that the values are out of range.
After using this application for some time, you decide that you would like to use it
with a variety of DAQ hardware, without maintaining separate copies of the code to
handle different settings. Instead, you decide to use INI files to store the settings
needed for each type of hardware that you work with. That way, you can change the
hardware settings by choosing a different INI file.
Design
You will develop a utility to create new INI files. Default.ini should contain these
settings for your analog input device:
• AI Channel = “PCI-6221/ai0”
• Sample Rate = 1000
• Samples per Channel = 100
Default.ini should contain these settings for your analog output device:
• AO Channel = “PCI-6221/ao1”
You will modify the Initialize case subdiagram of your application to load the values
from Default.ini.
You will add a button to the user interface to allow the user to load settings from a
different INI file. When the user clicks that button, the application should prompt them
to choose an INI file to load.
Guided Instruction
1. Open C:\Exercises\LabVIEW Core 2\
Loading and Storing Configuration\Load Config Settings.lvproj.
2. Create a VI that generates an INI file.
- From the Project Explorer window, open the Write Config Data VI from the
support folder.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-13
*
Modify the block diagram as shown in the following figure.
3.

Save the VI.
1
File Dialog VI
—Specify the path and name of the INI file that you want to create or modify.
2
Open Config Data VI
—Creates or opens the INI file.
3
Write Key VI
—Specify the section, key, and value that you want to write to the INI file. This VI automatically adapts to whatever data
type you wire to the
value
input.
4
Close Config Data VI
—Closes the INI file.
3
1
2
4
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-14 | ni.com
4. Specify values to controls on the front panel as shown in the following figure.
5. Run the VI.
- Name the file Default.ini in Choose or Enter Path of the INI File window.
- Save it in the same directory that the .lvproj file resides in.
- When the VI stops, open Default.ini and review the format of the INI file.
– Values are written to two sections: Analog Input and Analog Output.
– Each section contains one or more keys with their associated values.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-15
6.

Create a VI that reads configuration data from an INI file.*
From the
Project Explorer
window, open Read Config Data VI from the support folder.
*
Modify the block diagram as shown in the following figure.
7.

Save the VI.
1
Open Config Data VI
—Opens the specified INI file.
2
Read Key VI
—Specify the section and key that you want to read from the INI file. Use the Polymorphic VI Selector to specify the data
type that the function will read from the INI file. The values for the
section
and
key
constants must match the values in the INI file
exactly.
3
Close Config Data VI
—Closes the INI file.
4
Hardware Settings Type Definition and Bundle By Name function
—Place the Hardware Settings type definition on the block diagram
from the Project Explorer window and wire the Read Key VIs’ outputs as shown in the picture above using the Bundle By Name function.
2
3
1
4
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-16 | ni.com
8. Verify that the front panel looks similar to the following figure.
9. Verify the icon and terminals, as shown in the following figure.
10. Test the Read Config File VI.
- On the front panel, browse the configuration file in control and navigate to
```
C:\Exercises\LabVIEW Core 2\
```
Loading and Storing Configuration\Default.ini.
- Run the VI.
- Verify that each indicator is populated with the value that you specified in the
INI file.
11. From the Project Explorer window, open the Event-Driven State Machine – Load
Configuration VI.
12. Modify the Event-Driven State Machine – Load Configuration VI as shown in the
following figure, to load values from Default.ini each time the VI starts running.Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-17
1
Application Directory, Build Path functions and Check if File or Folder Exists VI
—Use these tools to determine if a Default.ini file exists
```
in the same directory as the LabVIEW project file (
```
```
.lvproj)
```
file for this application.
2
Case Structure
—If the Default.ini file exists, then the application executes the
True
case, which uses the Read Config Data VI to read
the configuration data from the INI file and store the configuration data into the Hardware Settings shift register.If the Default.ini file does not exist, then the application executes the
False
case and use the default values that initialized the Hardware
Settings shift register. The False case passes the cluster and error wires through, as shown in the following figure.
1
2
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-18 | ni.com
13. Modify the front panel to include a
Select Config File
button that the user can click to select and load an INI file containing different DAQ
configuration settings.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-19
14. Modify the Wait for Event case to handle the event when the user clicks on the
Select Config File
button.
1
“Select Config File”: Value Change event
—Select the event structure border and add an event case.
2
File Dialog VI
```
—Use this VI to launch a file dialog for the user to select an existing configuration file (.ini). In the
```
Configure File
dialog
window, set the options to
File
and
Existing
. Use the Application Directory VI to set the start path of the file dialog to the directory
containing the INI file.
3
Case Structure
—Wire the
exists
output of the File Dialog VI to the
Selector
input of the Case structure.
If the user selects a file that exists, the Case structure executes the True case, which uses the Read Config Data subVI to read theconfiguration data from the INI file and stores the configuration data into the Hardware Settings shift register.If the user selects a file that does not exist or clicks the Cancel button, the Case structure executes the False case, which continues touse the previously-stored hardware settings. The False case also uses the Clear Errors VI to clear Error 43, which the File Dialog VIpasses out if the user clicks the
Cancel
button. This ensures that a user clicking
Cancel
in a file dialog will not cause the application to
exit. You will learn more about the Clear Errors VI and error handling strategies in a later lesson.
2
1
3
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-20 | ni.com
Wire the False case as shown in the following figure.
- The False case, which executes when the user cancels, passes the existing
cluster values through and wires an empty error to the output terminal.
Canceling Choose or Enter Path of File dialog box should not cause the
application to halt or exit.
15. Run the Event-Driven State Machine – Load Configuration VI.
- Use execution highlight and probes to verify that the VI is loading
configuration data from the INI file.
- Examine the values passed in the following sections of code.
- Click Exit to stop the VI.
Case Subdiagram Expected Behavior
Initialize case Verify that the Read Config Data VI reads
correct values if a Default.ini file exists in the
LabVIEW project directory.
Acquire case Click the Acquire button. Verify that the Acquire
case outputs the AI Voltage Channel, Sample
```
Rate (Hz), and Samples per Channel values
```
specified in the INI file.
Update Stimulus case Click the Generate Stimulus button. Verify that
the Update Stimulus case outputs the correct
AO Voltage Channel value specified in the INI
file.
Wait for Event»”Select Config
File”: Value Change event case
Click the Select Config File button. Choose the
Default.ini file. Verify that the Read Config Data
VI reads the correct values from the INI file.
Click the Select Config File button again. In the
file dialog box, click the Cancel button. Verify
that the Case structure executes the False case,
passes the previous shift register cluster data,
and clears Error 43.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-21
Challenge
1. Create additional INI files with different settings and observe the effects of those
settings on the acquired data. For example, use a different AI Channel, such as
PCI-6221/ai2:3, and a different number of Samples per Channel, such as 500.
2. Modify the code to handle the situation where the INI file is missing one or more
keys.
3. Modify the Initialize case to programmatically create a new Default.ini file with
default settings if Default.ini does not exist.
On the Job
Would any of your applications benefit from using a configuration file?
If so, write a draft below of the contents for your configuration file. For example, if
you will use an INI file, write down the Section names, Key names, and Key values.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 4-1
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-23
```
Activity: Lesson Review
```
1. Match the following:
2. Locate an example for each of the following items in this INI file.
a. Section
b. Key
c. Value
3. Is the statement true or false?
Pre-defined configuration settings have a high risk of modifications by the end user.
a. True
b. False
4. Identify the file that has a TXT or CSV extension.
a. Tab-delimited
b. Comma-separated
c. Initialization
d. Delimited
Block Diagram
constants
a. Easy for the user to change configuration values
Front Panel controls b. Easy to create with minimal risk of user error
Delimited file c. Easy to read individual values
INI file d. Easy to read/write the whole file
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-24 | ni.com
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 4-25
```
Activity: Lesson Review – Answers
```
1. Match the following:
2. Locate an example of each of the following items in this INI file.
Block Diagram
constants
b. Easy to create with minimal risk of user error
Front Panel controls a. Easy for the user to change configuration values
Delimited file d. Easy to read/write the whole file
INI file c. Easy to read individual values
Copyright 2020 National Instruments
Lesson 4 Managing Configuration Settings in an Application
4-26 | ni.com
3. Is the statement true or false?
Pre-defined configuration settings have a high risk of modifications by the end user.
a. True
b. False
4. Identify the file that has a TXT or CSV extension.
a. Tab-delimited
b. Comma-separated
c. Initialization
d. Delimited
Copyright 2020 National Instruments
5
Developing an
Error Handling
Strategy
In this lesson, you learn strategies for handling errors in
your application.
Topics
A. Error Handling Overview
B. Injecting Errors for Testing
C. Handling Specific Errors Locally
D. Creating an Execution Log Files
Exercises
Exercise 5-1 Inject Errors
Exercise 5-2 Handle an Error Locally
Exercise 5-3 Create an Execution Log File
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-3
A. Error Handling Overview
This section introduces error handling and how to analyze code for potential error
handling.
What will your application do, when an error occurs? Consider the following options:
• Display an error dialog?
• Exit the application?
• Perform hardware shutdown procedures?
• Send the state machine to a “Shutdown” case?
• Ignore the error?
• Log the error to file?
• Retry the task?
Analyzing a Section of Code for Error Handling
To analyze a section of code and determine how it should handle an error, you should
yourself the following questions:
1. What could go wrong?
2. Can I do anything about it (logging, reporting, etc.)?
3. What will be the effect on subsequent code?
4. What should be the effect on subsequent code?
Automatic Error Handling
Disable automatic error handling for current and new VIs. Use programmatic error
management to control how errors are passed and reported.
Five Aspects of Error Handling
Here are five aspects of error handling:
```
• Error Injection (generation)
```
• Error Propagation
• Error Response
• Error Display
• Error Logging
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-4 | ni.com
Error Injection
Error injection is the creation of an error value at the point that something goes wrong
in the LabVIEW code.
By generating the error shown in the following code you can test how this application
handles an undefined or non-existing DAQmx channel specified by a user.
Error Propagation
There are many approaches of error propagation:
• Forking an error wire to parallel code paths
• Merging errors from parallel code paths
• Skipping execution of some nodes when an error occurs
There are many tools to facilitate error propagation:
• Case structure
• Merge Errors function
• Shift register
One way to break the error chain is neglecting to wire an error output that is part of
the error chain.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-5
Zero-iteration For Loop is also error chain breaker. If this For Loop iterates zero times,
upstream errors are lost and the output refnum is invalid. This is because For Loop
output tunnels return default values if the loop does not execute.
There are 2 options to prevent this issue:
• Use shift registers instead of tunnels for in/out pairs on For Loops to handle the
zero-iteration case.
• If you want your loop iterations to run independently, and you can’t use a shift
register because an error generated during one iteration would be passed to all
future iterations, use the Merge Errors function to merge the individual errors after
the loop executes.
Test Propagation Issues with the VI Analyzer Toolkit
You can test propagation issues with the VI Analyzer Toolkit.
The VI Analyzer Toolkit installs with the LabVIEW Professional Development System.
If you use the LabVIEW Full or Base Development System, you can install VI Analyzer
Toolkit from NI Package Manager.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-6 | ni.com
1. Run the Error Cluster Wired test in the VI Analyzer Toolkit.
• Detects subVIs and functions with unwired error outputs.
• Provides options to ignore certain objects.
2. Run the Unused Code test in the VI Analyzer Toolkit.
• Detects unwired output tunnels of structures.
3. Run the For Loop Error Handling test in the VI Analyzer Toolkit.
• Detects loop-related error propagation issues described earlier.
• Detects Merge Errors ordering issues on loop error output tunnels.
Error Response
How do you know if your error handling strategy is working correctly? To determine
this, you should test how your system responds to errors to ensure your error handling
code performs as expected.
Create a plan for error testing.
• Identify errors that are likely to occur in the system.
• Determine how the system should respond to each type of error. The following
are some examples:
• Ignore certain errors
• Clear errors
• Retry an operation
• Translate an errorCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-7
Error Display
Error Display is the act of displaying error information to the end user and/or code
developer. Displaying errors is almost always accomplished with the Simple Error
Handler VI or General Error Handler VI.
Error Logging
Log errors generated by LabVIEW code to file for later analysis.
Keep the following logging-specific ideas in mind:
• Log all errors, even those that your code handled.
• Log “no error” events.
• Add timestamps to the logs to understand when the errors are occurring.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-8 | ni.com
Error Handling—Development versus Deployment Phases
Develop error handling code for two stages:
• Development Phase
– Error handling code should be noticeable and should clearly indicate where
errors occur. This will help you, as a developer, to determine where any bugs
might exist in your application.
For example, use the Display Errors node to display the error code, source, and
explanation in a dialog.
• Deployed Phase
– The error handling system should be unobtrusive to the user.
– The error handling system should allow a clean exit and provide very clear
prompts to the user.
For example, the application could create an execution log instead of
displaying intrusive error dialogs. Also, the application should shutdown
gracefully, for example, setting all outputs to safe states before exiting. The
application could also display a dialog asking the user to contact the developer
who supports the application. Then, the developer could ask the user to send
the execution log, which can aid the developer in troubleshooting the error.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-9
B. Injecting Errors for Testing
This section discusses how to test your error handling logic by injecting errors.
Inject Error—Perform Action to Cause an Error to Occur
One way to inject an error is to manually perform actions to cause an error.
For example, you can manually do the following:
• Cancel an open file dialog.
• Try to write to a read-only file.
• Specify an invalid INI file.
• Specify an invalid hardware channel.
• Unplug the network cable.
Inject Error—Modify Code to Create an Error
Another way to inject an error is to modify your code to cause an error.
For example, you could modify your code to send a message for a case that doesn’t
exist.
Also, you could inject a specific error code by using the Error Cluster From Error Code
VI or the Error Ring.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-10 | ni.com
Error Ring
Interactively configure a specific error value on the block diagram at edit time.
Error Ring — Custom Error Codes
The following error code ranges are reserved for custom error messages.
• -8,999 through -8,000
• 5,000 through 9,999
• 500,000 through 599,999
Verify Error Handling Behavior
• Verify that the proper errors are reported.
• Verify that the error handling code handles errors gracefully.
– Critical errors result in a safe system shutdown.
– System should recover from non-critical errors.
```
Demonstration: Inject Errors Example
```
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-11
Exercise 5-1: Inject Errors
Goal
Test how an application handles an error by injecting an error.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Cause an error to occur in the application
1. Open C:\Exercises\LabVIEW Core 2\Inject Error\Inject Error.lvproj.
2. From the Project Explorer window, open the Event-Driven State Machine - Inject
Error VI.
3. Run the VI.
4. Double-click the text in the AI Voltage Channel control and set it to
Undefined_PCI-6221/ai0:8.
5. Click the Acquire button.
This will cause an error in the Acquire case of the state machine because
Undefined_PCI-6221/ai0:8 does not exist in your system.
6. How does the application respond to this error?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
7. Notice that the application responded to the error by displaying the following error
dialog, which explains the error. After you click the Continue button, the
application stops executing and exits.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-12 | ni.com
Simulate an error occurring by injecting the corresponding
error cluster in the application code
If you want to test how your application handles a specific error occurring at a specific
location, you can inject the corresponding error cluster at that location in your
application.
1. On the block diagram, go to the Acquire case of the state diagram.
1 Error Cluster From Error Code VI—Right-click the error code input and select Create»Constant. Set the
constant to -200220. Use the Context Help to learn the details of this VI.
1
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-13
2. Run the VI.
3. Click the Acquire button.
This will cause Error -200220 in the Acquire case of the state machine because
of your modifications to the code.
4. Using the Error Cluster From Error Code VI to inject an error is another way of
testing how your application responds to a specific error.
On the Job
What errors do you need to inject into your application to test how your application
handles errors?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 5-1
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-14 | ni.com
C. Handling Specific Errors Locally
This section discusses strategies on how to handle specific errors locally, as soon as
an error occurs.
Simple Error Management
To start this section, let’s quickly review simple error management.
For each node, if there is no error, the node executes normally. If there is an error, the
node passes the error to the next node and skips executing its normal functionality.
The exception is that “shutdown” VIs/functions, such as Close File, Release Queue,
and DAQmx Clear, will attempt to execute regardless of an incoming error.
Then at the end of the VI, typically you have seen the Simple Error Handler report any
errors in a dialog.
Local Error Handling
Examples of possible actions include the following:
• Prevent errors
• Ignore the error
• Retry an action to fix the error
• Correct something to fix the error
• Shutdown the code
Validating Inputs to Prevent the Error
Another error handling approach is to prevent an error by validating inputs.
Examples
• If a control value will be used as the denominator of a divide operation, develop
code that checks that the control value is not zero before proceeding.
• If a control value must be between -10 and 10, set control min/max values on the
Data Entry tab of Properties dialog box.
Local Error Handling Code called in specific locations to immediately respond to
specific error codes with an action
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-15
Ignore Error
Many errors can be ignored. There are many cases when an error may be expected,
when the error may be detected in another way, or when the error simply does not
have any relevance to the program.
An example of an ignorable error is a canceled dialog box. The File Dialog express VI
returns an error with error code 43, if the user clicks the Cancel button on the
launched file dialog. You can use the Clear Errors VI to clear error 43 from the error
wire, if that error is one of the error codes on the error wire.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-16 | ni.com
Retry Action
You can retry actions as a way to correct an error.
For example, many communication errors can be fixed by waiting for the instrument
to finish processing a previous command or waiting for the network to reconnect and
retry the communication. You should generally limit the number of retries or the
amount of time that can be spent on retries to avoid infinite loops.
When retrying errors, you might also want to display a dialog to the user to let the
user know that your application is retrying a particular action.
Retry Action—Example
In the Retry Action example shown in figures below, if the user enters a non-existing
or invalid DAQmx channel, the application can launch a dialog that notifies the user
that their specified DAQmx channel is invalid and asks the user to retry entering a valid
DAQmx channel.
This is a better user experience than if the error just caused the application to shut
down.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-17
Correct the Cause of an Error
You can execute code to directly correct the error.
For example, you can provide a default directory or file if the user cancels a file dialog.
Or you might close the communication to a device or instrument and re-open the
communication. This often clears buffers and fixes some errors. Other errors might be
fixed by programmatically adjusting input parameters to the code.
When you fix an error by retrying or executing code, you should either filter out the
error since it’s been handled or convert it to a warning so that it is logged to the error
log.
Shutdown Code
Bad Shutdown Code Example
If a section of code must execute whether or not an error has occurred, then ensure
that an error will not prevent that code from executing. For example, you typically
would always want your shutdown code to execute even if an error has previously
occurred.
In the example block diagram shown in figure below, if the incoming error wire
contains an error, what will happen in this shutdown code? Will the DAQmx Write VIs
set the analog output channels to a safe shutdown output voltage?
In figure above, the incoming error on the error wire will cause the DAQmx Write VIs
to skip their normal execution, which means the DAQmx Write VIs will not set the
analog output channels to their safe shutdown output voltages.
Therefore, this is an example of bad shutdown code.
Better Shutdown Code Example
In the example block diagram shown in figure below, if the incoming error wire
contains an error, what will happen in this shutdown code? Will the DAQmx Write VIs
set the analog output channels to a safe shutdown output voltage?
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-18 | ni.com
Because both of the DAQmx Write VIs do not have an incoming error wire, the DAQmx
Write VIs will always try to execute their normal functionality and will always try to
set the analog output channels to the specified safe shutdown output voltage values.
The shutdown code then uses the Merge Errors function to combine any errors onto
a single error wire, and then passes the error wire to the Simple Error Handler VI.
Therefore, this is an example of better shutdown code.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-19
```
Exercise 5-2: Handle an Error LocallyGoalHandle a specific error immediately by asking the user to retry an action.Hardware Setup(Hardware)
```
In the exercises where we work with Analog Input/Output channels, we use PCI-6221/USB-6212 multifunction I/O device paired
```
with the BNC-2120 shielded connector block. Analog Input 2 should be connected to the Sine/Triangle BNC connector. Analog Input 3 shouldbe connected to the TTL Square Wave BNC connector. The Sine/Triangle waveform switch should be set to Sine.ScenarioIn Exercise 5-1, you tested how this application responds to the user entering an invalid DAQmx channel. The application manages it bydisplaying an error dialog and exiting.In this exercise, you want to define how the application handles this error.The application will display a “AI Voltage Channel is invalid. Please enter valid channel(s)” dialog box to the user and then allow the user tore-enter a different channel.Handling an Error Locally1.
```

Open
```
C:\Exercises\LabVIEW Core 2\Handle Error Locally
```
\Handle Error Locally.lvproj
.
2.

From the
Project Explorer
window, open the Event-Driven State Machine – Handle Error Locally VI.
3.

On the block diagram, go to the Acquire case of the state diagram.
4.

Modify the block diagram as shown in the following figure, to perform a finite acquisition if the DAQmx Create Channel VI does notoutput Error -200220.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-20 | ni.com
Tip

To make the current case the False case, right-click the border of the Case structure and select
Make This Case False
.
1
Clear Errors VI
—Clears a specific error or warning from the error wire if it matches a code you specify. Use the context help to learn
more about this VI.
2
Case Structure
—If the Clear Errors VI did not find error -200220 in the error wire, then perform a finite acquisition.
1
2
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-21
5.

Modify the block diagram as shown in the following figure, to locally handle Error -200220 by displaying an instructive dialog to the userand going back to the Wait for Event state.
6.

Examine the new error handling behavior of the application.*
Run the VI.
*
Set the AI Voltage Channel control to a valid channel, such as
PCI-6221/ai0, PCI-6221/ai2:3
.
1
Case Structure
—Select the True case.
2
One Button Dialog
—Display a dialog to the user to specify a valid channel. Right-click the message input and select
Create»Constant
.
Set the constant to
AI Voltage Channel is invalid. Please enter valid channel.
3
```
States Enum Constant (type definition)
```
—Right-click the blue enum output tunnel on the Case structure and select
Create»Constant
. Set
the constant to Wait for Event. If Error -200220 occurs, there is no need to go to the Analyze state, so the application should go backto the Wait for Event state instead.
3
1
2
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-22 | ni.com
- Click the Acquire button. The VI should run.
- Double-click the text in the AI Voltage Channel control and set it to an invalid
channel, such as Undefined_PCI-6221/ai0:8.
- Click the Acquire button.
This will cause an error in the Acquire case of the state machine because
Undefined_PCI-6221/ai0:8 does not exist in your system.
- Verify that the application handles this error by displaying a dialog to the user
and allowing the user to enter the AI Voltage Channel again.
- Click the Exit button to stop the VI when finished.
7. Examine the error handling behavior of this application for an error that is not
handled locally.
- Run the VI.
- Double-click the text in the AO Voltage Channel control and set it to an invalid
channel, such as Undefined_PCI-6221/ao1.
- Click the Generate Stimulus button.
This will cause an error in the Update Stimulus case of the state machine
because Undefined_PCI-6221/ao1 does not exist in your system.
Because the VI block diagram does not have any local error handling in the
Update Stimulus case of the Case structure, this VI handles the error by exiting
the While Loop, displaying an error dialog, and stopping the VI.
Preventing Incorrect Behavior
In the Analyze case in this application, the Analyze subVI calculates the RMS values
```
of the acquired data and compares them to the Threshold (rms) control value.
```
However, because the calculated RMS values will always be zero or positive values,
```
it does not make sense for the Threshold (rms) control to pass in a negative value.
```
```
To prevent a potential user error or confusion, edit the Threshold (rms) control to have
```
a minimum value of 0, to prevent the user from entering a negative value.
1. On the front panel, right-click the Threshold (rms) control and select Properties.
2. In the Data Entry tab, uncheck the Use Default Limits checkbox, then set Minimum
to 0 and select Coerce under the Response to value outside limits drop-down list.
3. Test the new behavior.
- Try setting the Threshold (rms) control to a negative value, such as -5.
- Notice that the Threshold (rms) control coerces a negative value to 0.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-23
Your Turn
Modify this VI to also handle an error of invalid AO Voltage Channel locally by
displaying an instructive dialog of “AO Voltage Channel is invalid. Please enter
a valid analog output channel” to the user.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
To view the solution, refer to [Your Turn Solution] Event-Driven State Machine -
Handle Error Locally VI in the C:\Solutions\LabVIEW Core 2\Exercise 5-2 directory.
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
On the Job
Would any of your applications benefit from handling a specific error locally?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
If so, what specific errors do you want to handle locally?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
```
Describe how you would handle each of those errors (ignore error, retry action, fix
```
```
source of error, etc.).
```
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 5-2
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-24 | ni.com
D. Creating an Execution Log Files
This section discusses how to create an execution log and what information an
execution log should include.
Execution Log
If your application generates an execution log file, the execution log can make it easier
for the developer or user to identify issues that occurred in an application.
An execution log should include the information necessary for someone to understand
the state of an application at the time data was collected. Typical information include
the following:
• Timestamps
• State information
– State name
– Configuration values
– State data
Execution Log Example
In this example, every time the application starts running, it will create an execution
log file which includes the timestamp in the filename.
Then every time the application enters a state, the application logs the current
timestamp, name of the state and any configuration values and data acquired or
processed in that state.
1 Timestamps
2 States
3 Configuration Values and Data
123
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-25
Execution Log—ErrorsAn execution log should log information about critical errors to assist with troubleshooting.An execution log should explicitly log whether the application completed successfully or exited due to an error.In the example execution log shown in figure below, the last entry is that an error occurred along with the error explanation. Because it isthe last entry, I can tell that this error caused the application to exit. Due to the error explanation and the previous entry, I can deduce thatthis error occurred in the Acquire state and that this error occurred because the AI Voltage Channel was blank and unspecified.In the second example execution log, the last entry is
Success
, so I know that the application completed successfully without any errors.
Having an explicit entry for
Success
is very useful, because if I see an execution log that doesn’t end with a
Success
entry, I know something
must have gone wrong.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-26 | ni.com
Execution Log—Example CodeThis is an example of how you can code the implementation of the execution logs that you just saw.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-27
Exercise 5-3: Create an Execution Log File
Goal
Explore how an example application logs timestamps, state information, and error
information to an execution log file.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Guided Instruction
Explore Example Execution Log Files
1. In Windows Explorer, go to the C:\Exercises\LabVIEW Core 2\Execution Log
directory.
2. Explore an example of an execution log where an error occurs.
- Double-click [Error Example] YYYYMMDD_HHMMSS_ExecutionLog.txt to
view its contents.
- By looking at this execution log, you can see the error information at the end
of the file. You can also see the timing, states, and state data that led to this
error occurring in the application.
- Close the file when finished.
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-28 | ni.com
3. Explore an example of an execution log where no errors occur.
- Double-click [Success Example] YYYYMMDD_HHMMSS_ExecutionLog.txt to
view its contents.
- In this example execution log, you know that no errors occurred because the
end of the log file explicitly logs Success when the application exited.
- The information in the execution log allows you to have an idea of what
happened during this run of the application.
- Close the file when finished.
Explore Example Code That Creates Execution Log Files
1. Open C:\Exercises\LabVIEW Core 2\Execution Log\Execution Log.lvproj.
2. From the Project Explorer window, open the Event-Driven State Machine
```
(Execution Log) VI.
```
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-29
3.

Explore the block diagram.
4.

Generate an error log with no errors.*
Run the VI.
*
Click a few buttons without causing an error.
*
Click the
Exit
button to stop the VI.
1
Open/Replace/Create File
—Creates the execution log file.
2
Scroll through every state in the state machine. Notice that every state contains code that writes timestamp, the current state, andstate data to the execution log file.
3
If an error has occurred, this part of the VI outputs a string containing the error information.If no errors have occurred this part of the VI outputs a string containing
Success!
.
4
Write to Text File
—Writes this text to the execution log file.
5
Close File
—Closes the file.1
2
4
5
3
Copyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-30 | ni.com
- Open the new execution log created in the C:\Exercises\LabVIEW Core 2\
Execution Log directory.
Notice that the last line of the execution log is Success!.
- Close the execution log file.
5. Generate an error log with an error.
- Run the VI.
- Double-click the text in the AI Voltage Channel control and set it to
Undefined_cDAQ1Mod8/ai0:8.
- Click the Acquire button.
This will cause an error in the Acquire case of the state machine because
Undefined_cDAQ1Mod8/ai0:8 does not exist in your system.
Click Continue on the error dialog window. The VI now exits.
- Open the new execution log created in the C:\Exercises\LabVIEW Core
2\Execution Log directory.
Notice that the last lines of the execution log contain the error information.
Notice that the Acquire state information before the error contains the
incorrect AI Voltage Channel value of Undefined_cDAQ1Mod8/ai0:8.
- Close the execution log file.
6. Close the VI and project when finished.
On the Job
1. Would any of your applications benefit from creating an execution log? If so, what
information should you write to the execution log?
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
End of Exercise 5-3
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 5-31
```
Activity: Lesson Review
```
1. Which shutdown code is better?
a.
b.
2. True or False?
If an application executes without giving an error, the application should not log
anything to the execution log.
a. True
b. False
3. “Forking an error wire to parallel code paths” is a method used for _______.
a. Error propagation
b. Error injection
c. Error response
4. Which of the following methods is used for preventing errors?
a. Adjusting input parameters according to the code
b. Setting minimum and maximum limits for input values
c. Waiting for an instrument to finish following the previous command
d. Clearing buffer of a deviceCopyright 2020 National Instruments
Lesson 5 Developing an Error Handling Strategy
5-32 | ni.com
```
Activity: Lesson Review – Answers
```
1. Which shutdown code is better?
a. Bad Shutdown Code
b. Better Shutdown Code
2. True or False?
If an application executes without giving an error, the application should not log
anything to the execution log.
a. True
b. False
An application with an execution log should explicitly log whether the
application completed successfully or exited due to an error.
3. “Forking an error wire to parallel code paths” is a method used for _______.
a. Error propagation
a. Error injection
a. Error response
4. Which of the following methods is used for preventing errors?
a. Adjusting input parameters according to the code
b. Setting minimum and maximum limits for input values
c. Waiting for an instrument to finish following the previous command
d. Clearing buffer of a device
Copyright 2020 National Instruments
6
Distributing
Applications
In this lesson, you will learn to package and distribute your
LabVIEW code for use by other developers and end-users.
Topics
A. Preparing Code for Distribution
B. Build Specifications
C. Creating and Debugging an Application
D. Creating an Installer
E. Creating a Package for Distribution
Exercises
Exercise 6-1 Preparing Files for Distribution
Exercise 6-2 Create and Debug a Stand-Alone Application
Exercise 6-3 Create an Installer
Exercise 6-4 Creating a Package
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-3
A. Preparing Code for DistributionIdentify tasks to complete when preparing project files for distribution.First, prepare your files.Before you can create a stand-alone application with your VIs, you must first prepare your files for distribution.1.

Recompile and save changes to VIs.
2.

Verify desired settings of
VI Properties
.
3.

Ensure paths generate correctly.
4.

Conditionally call the Quit LabVIEW function.
Recompile and Save ChangesEnsure that all VIs are saved in the latest version of LabVIEW.If your application has more than a few VIs, manually opening and saving each VI can be tedious. Instead, you can choose to mass compileall of the VIs in a given directory. To do this, go to
Tools»Advanced»Mass Compile
. In the Mass Compile dialog box, select the root directory
that contains all of the VIs that your application calls.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-4 | ni.com
VI Properties
Navigate to File»VI Properties to open the VI Properties dialog box. Here you can
customize the window appearance and size. You might want to configure a VI to hide
scroll bars or might want to hide the buttons on the toolbar.
Paths
Suppose you read data from a file in the application and the path to the file is
hard-coded on the block diagram. Once an application is built, the file is embedded in
the application, changing the path of the file. As a result, the file will not be read since
the path is different.
It is recommended to set paths relative to the directory containing the application
using the Application Directory VI.
When using relative file path, if the VI is called from a stand-alone application, it
returns the path to the folder containing the application and if it is called from a
```
LabVIEW project (.lvproj) in the LabVIEW Development System, it returns the path to
```
the project folder.
System Paths
Regardless of whether the calling VI is part of an application, library, or built
application, the Get System Directory VI always returns the path to the specified
Windows system directory.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-5
In this case, we generate the path to a log file that will be stored in the Documents
system folder for the current user.
Quit the Application
In a stand-alone application, the top-level VI must quit LabVIEW or close the front
panel when it finishes executing. To completely quit and close the top-level VI, you
must call the Quit LabVIEW function on the block diagram of the top-level VI.
The RUN_TIME_ENGINE symbol specifies whether the subdiagram executes when you
create a LabVIEW stand-alone application or shared library that uses the LabVIEW
Run-Time Engine.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-6 | ni.com
Exercise 6-1: Preparing Files for Distribution
Goal
Review the Building Applications Checklist and prepare VIs to build a stand-alone
application.
Scenario
Review the Building Applications Checklist to assist you in the build process before
creating a stand-alone application or installer.
Stand-alone applications in LabVIEW have the Window Appearance set to Top-level
application window to open the VI front panel when the application runs.
A VI that runs as a stand-alone application remains in memory when the application
finishes running. Therefore, it is necessary to call the Quit LabVIEW function to close
the application when the application finishes executing. Placing the Quit LabVIEW
```
function on the block diagram can make editing the application more difficult in the
```
future because LabVIEW exits each time the application finishes executing.
Design
• Modify the VI Properties to prepare to build a stand-alone application.
• Modify the application to call the Quit LabVIEW function when the code is
executed in the run-time system.
• Modify the application to specify a log path relative to the stand-alone application.
Design
Before you build an application, you first prepare the code so that it executes reliably
when compiled into an application.
Review the Building Applications Checklist
1. Select Help»LabVIEW Help to open theLabVIEW Help.
2. Select Fundamentals»Building and Distributing Applications»Developing and
Distributing an Application.
3. Review the Preparing to Build the Application section.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-7
Guided Instruction
Set the Top-Level Application Window
1. Open C:\Exercises\LabVIEW Core 2\Deployment\Event-Driven State
Machine.lvproj.
2. From the Project Explorer window, open the Event-Driven State Machine - Main VI.
3. Select File»VI Properties to display the VI Properties dialog box.
4. Select Window Appearance from the Category pull-down menu.
5. Uncheck the Same as VI name checkbox, and enter a name, such as Event-Driven
State Machine, in the Window title text box.
6. Select Top-level application window to give the front panel a professional
appearance when the VI opens as a stand-alone application.
7. Click the Customize button to view the various window settings that LabVIEW
provides for configuring the top-level application windows.
8. Click OK to close the Customize Window Appearance dialog box and click OK to
close the VI Properties dialog box.
9. Save the VI.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-8 | ni.com
##### Call the Quit LabVIEW Function1.

Open and modify the block diagram to call the Quit LabVIEW function when the application finishes. The Quit LabVIEW function exitsLabVIEW and closes the application after it has executed.
2.

In the
Project Explorer
window, select
File»Save All
to save all the VIs.
Specify a File Path Relative to the ApplicationThe Event-Driven State Machine - Main VI already contains code to specify a relative path to the application.Open the Generate Timestamped VI in the Log case of the loop. The Application Directory VI creates a path relative to the stand-aloneapplication when you call the VI from a stand-alone application. Otherwise, the Application Directory VI returns the path to the foldercontaining the project file.Test1.

Run the Event-Driven State Machine - Main VI to ensure that it is working.
2.

Save the VI and the project.
##### End of Exercise 6-11

Conditional Disable Structure
—Place a
Conditional Disable Structure
after the Simple Error Handler VI from the
Quick Drop
window.
Wire the error out of the Simple Error Handler VI to the border of the structure. Right-click the border of the structure and select
Add
Subdiagram After.
In the
Configure Condition
dialog, set the value of
```
Symbol(s)
```
to
Run_Time_Engine
. Set
```
Value(s)
```
to
True.
2
Quit LabVIEW Function
—Place this function in the “RUN_TIME_ENGINE==True” subdiagram. You can leave the Default subdiagram
empty.
12
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-9
B. Build Specifications
Understand build specification settings and determine when a build specification is
necessary.
Build Specifications
Build specifications contain all of the settings for a build such as:
• Files to include in the build
• Directories to create when the build executes
• Settings for VIs included in the build
Note You must have the Application Builder installed to use build
specifications. The Application Builder is part of the LabVIEW Professional
Development System or can be purchased as an add-on to the LabVIEW
Base Development System or Full Development System.
Why Use Build Specifications?
```
• Stand-alone Applications (EXE) —Use stand-alone applications to provide other
```
users with executable versions of VIs. This is useful when you want users to run
VIs without installing the LabVIEW Development System.
• Installers—Use installers to distribute stand-alone applications, shared libraries,
and source distributions that you create with the Application Builder. You can
include the LabVIEW Run-Time Engine.
• .NET Interop Assemblies—Use .NET interop assemblies to package VIs for the
Microsoft .NET Framework.You must install the Microsoft.NET Framework 2.0 or
higher to build a .NET interop assembly using the Application Builder.
• Packages—Use packages to distribute source distributions, packed project
libraries, shared libraries, .NET assemblies, or applications to users. You can
distribute packages to clients through NI Package Manager or SystemLink.
• Packed Project Libraries—Project libraries that package multiple files into a single
file with a .lvlib file extension. The top-level file of a packed library is a project
library. By default, the packed library has the same name as the top-level project
library.
```
• Shared Libraries (DLL)—Use shared libraries if you want to call VIs using
```
text-based programming languages through shared libraries such as Dynamic Link
```
Libraries (DLLs).
```
• Source Distributions—Use source distributions to package a collection of source
files. Source distributions are useful if you want to send code to other developers
to use in LabVIEW. You can configure settings for specified VIs to add passwords,
remove block diagrams, or apply other settings. You also can select different
destination directories for VIs in a source distribution without breaking the links
between VIs and subVIs.
• Zip Files—Use zip files when you want to distribute files or an entire LabVIEW
project as a single, portable file. A zip file contains compressed files, which you
can send to users. Zip files are useful if you want to distribute selected source files
to other LabVIEW users. You also can use the Zip VIs to create zip files
programmatically.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-10 | ni.com
C. Creating and Debugging an Application
Create and debug a stand-alone LabVIEW application.
System Requirements for Applications
Applications that you create with Build Specifications generally have the same system
requirements as the LabVIEW Development System. Memory requirements vary
depending on the size of the application created.
You can distribute these files without the LabVIEW Development System. However,
to run stand-alone applications and shared libraries, you must have the LabVIEW
Run-Time Engine installed.
Configure the Build Specification of Stand-alone Applications
In the Application Properties dialog box:
• Specify the name of your application.
• Specify the known destination for generated application files.
• Identify a startup VI and include any dynamically linked files.
• Enable debugging, if desired.
• Preview the build.
• Save the project and build the application or shared library.
• Verify the build.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-11
Application Properties—Information
Set the Build specification name and Target filename. The application is typically used
on a computer other than the development computer where it is built. To avoid having
several built files taking up space on the development machine, send all builds to a
```
folder that is known to be cleaned up on a regular basis (e.g. a “temp” folder). If it is
```
necessary to keep all built files stored on the development machine, make sure they
are sent to a known location.
Application Properties—Source Files
Application needs at least one VI to be a startup VI, but more than one is allowed. Any
files that are STATICALLY linked to the Startup VI, such as subVIs and type
definitions, do not have to be explicitly included in the Startup VIs or Always Included
sections, as they are always included automatically.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-12 | ni.com
Unlike statically linked subVIs, dynamically loaded VIs do not load until the caller VI
```
loads them with the Open VI Reference. Dynamically linked files (Dynamic VIs, .dll,
```
```
other documents like text files, XML files, Config files, and so on) need to be included
```
to Always Included section.
Application Properties—Advanced
Consider enabling debugging in an application.
Typically an application runs on a machine with the LabVIEW Run-time engine only so
there is no way to look at the block diagram. However, a different PC with a LabVIEW
development license installed can connect to the application provided they can see
each other over a network. This other PC can then be used to debug the application
using debugging tools, such as execution highlighting, probes, breakpoints, and so on.
Note that enabling debugging in an application makes it bigger by including block
diagrams. Therefore, enabling debugging might not be appropriate when the
application will be used on platforms with limited resources, such as Single-board PCs.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-13
Application Properties—Preview
The last tab is the Preview pane. This is where you can see the directory structure and
files that will be generated when you build an application.
• Click Generate Preview to see what files will be generated and where.
• After seeing the preview, click OK rather than Build. You want to save the build
specification first.
Save the Project and Build the Application
```
• Select File»Save All (This Project) to save all files associated with the project,
```
including build specifications.
• Right-click the build specification and select Build to create the application.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-14 | ni.com
Build Status
The Build status dialog box will appear. When the build finishes:
• Click the Explore button to open the directory where the new application is
located.
• Click the Done button to close the Build Status dialog box.
Note After building, you can also run the application through the shortcut
menu.
Run the Application and Verify Execution
Run the application by double-clicking the.exe file that was created.
On Windows you may be asked to allow the executable access so that the application
can communicate through the local firewall.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-15
Debug the Application– LabVIEW on Same MachineIf the application does not run as you expected, you can debug the application on the same computer. This will only work if you have enableddebugging in the build specifications.1

Select
Operate
»Debug Application or Shared Library
.
2
In the
Debug Application or Shared Library
dialog box, enter the
Machine name or IP address
of the destination computer. If LabVIEW
is running on the same machine as the application, enter localhost in the
Machine name or IP address
text box.
3
Click the
Refresh
button if you do not see the application you want in the
Application or shared library
pull-down menu.
4
Click the
Connect
button to start debugging.
24
1
3
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-16 | ni.com
Debug the Application from LabVIEWYou now have access to most LabVIEW debugging tools.Why Might an Application Behave Differently?In general, it's always a good idea to test your distribution method along the way as you develop. Building your application regularly andmaking sure things work as expected is time well spent.Application behavior can change when you distribute it to a different system for a number of reasons.•
File paths may change.
•
Missing drivers or support files.
•
System memory or CPU speed may differ.
•
The application INI file differs from the LabVIEW INI file.
•
Not all features are supported by the LabVIEW Run-Time Engine.
•
Conditional Disable Structure has incorrectly configured
```
RUN_TIME_ENGINE==True
```
subdiagram.
```
Demonstration: Creating an Application
```
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-17
Exercise 6-2: Create and Debug a Stand-Alone
Application
Goal
```
Create a build specification, build a stand-alone application (EXE) in LabVIEW, and
```
debug the application running on the local computer.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
Create a stand-alone application to run the Event-Driven State Machine - Main VI.
```
After you prepare your files, you create an Application (.exe) Build Specification, and
```
run the application. You then use LabVIEW to debug the running application.
Design
```
Use the Application (EXE) Build Specifications to create a stand-alone application for
```
the event-driven state machine application.
Connect with the running application by creating a debugging session in LabVIEW.
Review the Building Applications Checklist
1. Select Help»LabVIEW Help to open theLabVIEW Help.
2. Select Fundamentals»Building and Distributing Applications»Developing and
Distributing an Application.
3. Review the Configuring Specifications for a Built Application list of steps.
Guided Instruction
```
Creating an Application (EXE) Build Specification
```
1. Open C:\Exercises\LabVIEW Core 2\Creating an Executable\Event-Driven
State Machine.lvproj.
2. Right-click Build Specifications in the Project Explorer window and select New»
```
Application (EXE) from the shortcut menu.
```
3. (Optional) Place a checkmark in the Do not prompt again for this operation
checkbox and click the OK button if you receive a prompt about SSE2
optimization.
4. Modify the filename of the target and destination directory for the application in
the Information page.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-18 | ni.com
- Select the Information page.
- Change the Target filename to Event-Driven State Machine.exe.
- Enter C:\Exercises\LabVIEW Core 2\Creating an Executable\Executable
in the Destination directory text box.
Tip You do not need to create the directory. LabVIEW creates any
directories that you specify.
5. Specify the top-level VI for the application.
- Select the Source Files page.
- Select the Event-Driven State Machine - Main VI in the Project Files tree.
- Click the right arrow next to the Startup VIs listbox to add the selected VI to
the Startup VIs listbox.
6. Include code to allow debugging of the application.
- Select the Advanced page.
- Place a checkmark in the Enable debugging checkbox.
- Click OK.
7. In the Project Explorer window, select File»Save All.
8. In the Project Explorer window, right-click the My Application build specification
and select Build from the shortcut menu.
9. Click Done in the Build status window.
Running the Application
1. Close the Project Explorer window and exit LabVIEW.
2. Navigate to C:\Exercises\LabVIEW Core 2\Creating an
Executable\Executable in Windows Explorer.
3. Run Event-Driven State Machine.exe.
- Click the Acquire button.
- Click the Exit button when done.
4. Verify that the application closed when you stopped the application and the
application created a text file in the Executable folder.
Debugging the Application on the Same Computer
1. Launch LabVIEW.
2. Run the Event-Driven State Machine.exe.
3. Select Operate»Debug Application or Shared Library from the LabVIEW window.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-19
4. Enter localhost in the Machine name or IP address text box.
5. Select Event-Driven State Machine.exe from the Application or shared library
drop-down menu.
- Click the Refresh button if Event-Driven State Machine.exe does not appear in
the list.
6. Click the Connect button to create the debugging connection.
7. Start debugging the running application.
- Open the block diagram.
- Turn on execution highlighting.
- Try using probes, breakpoints, and single-stepping.
8. Click the Stop button in the debugging window to stop the application.
End of Exercise 6-2
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-20 | ni.com
D. Creating an Installer
Create, configure, build, and deploy a LabVIEW installer.
Why Create an Installer?
Building an installer ensures that the application installs with the correct version of the
LabVIEW Run-Time Engine. Applications developed in LabVIEW 2019, for example,
require the LabVIEW 2019 Run-Time Engine.
```
If an application relies on drivers (like NI-DAQmx), they will also need to be installed
```
on the target. An installer ensures the necessary drivers are installed.
If you have just one destination machine, copying an executable files and separate
installation of support drivers/files might be doable. However, to replicate the
application on several machine and ensure that files are copied over correctly on each
machine, it is best to rely on the reproducibility of an installer.
Professional applications are almost always distributed using installers. For example,
customers expect to run setup.exe on any Windows machine they are installing
software on.
Configuring Installer Build Specifications
In the Installer Properties dialog box:
• Include the LabVIEW Run-Time Engine.
• Include drivers used by the application.
Note Refer to theCaveats and Recommendations for Building Installers
topic of theLabVIEW Help for more information.
Installer Properties – Product Information
Configure Product Information section in analogous way we have explore for
configuring the EXE properties.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-21
Installer Properties—Source Files
Specify the Build Specification.
Installer Properties—Additional Installers
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-22 | ni.com
Run the Installer on the Destination Computer
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-23
Exercise 6-3: Create an Installer
Goal
Create an installer build specification and build the installer. As a challenge, remotely
debug the application created by the installer.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
Creating an installer simplifies deploying an application to multiple machines. After you
```
have prepared your files, you create an Application (.exe) Build Specification and
```
then create an Installer Build Specification.
Design
```
Use an Installer Build Specification to create an installer for the Application (.exe) Build
```
Specification.
Note To successfully build an installer, make sure that your exercise
source files are placed in the appropriate location, that is — C:\Exercises\
LabVIEW Core 2\”name of the current exercise”.
Guided Instruction
Creating an Installer Build Specification
1. Open C:\Exercises\LabVIEW Core 2\Creating an Installer\Event-Driven
State Machine.lvproj.
2. Right-click Build Specifications in the Project Explorer window and select
New»Installer from the shortcut menu.
3. Modify the installer destination in the Product Information page.
- Select the Product Information page.
- Type C:\Exercises\LabVIEW Core 2\Creating an Installer\Installer as
the Installer destination.
4. Specify the Installer Build Specification.
- Click the Source Files page.
- Select My Application under the Build Specification folder.
- Expand Program Files and select Event-Driven State Machine in the
Destination View tree.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-24 | ni.com
*
Click the right arrow next to the
Project Files View
tree to place the event-driven state machine application and all application support
files under
Program Files»Event-Driven State Machine
in the
Destination View
tree as shown in figure below.
5.

Add the NI LabVIEW Run-Time Engine to the installer by modifying the
Additional Installers
page.
*
Select the
Additional Installers
page.
*
Select the
NI LabVIEW RunTime 2019
and
NI-DAQmx Runtime 19.0
```
installers (or later versions), if they are not already automatically
```
selected.
*
Click
OK
.
Note

Some additional installers you might select in the
Additional Installers
page, can require you to have downloaded the product
installation package before you can include the product installer in your application installer. To download an installation package,go to
ni.com/info
and enter the code
downloads
.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-25
6. In the Project Explorer window, right-click the My Installer build specification and
select Build from the shortcut menu.
7. Click Done when LabVIEW finishes building the installer.
8. Save and close the Project Explorer window and close LabVIEW.
Test
1. Run the install.exe file in the C:\Exercises\LabVIEW Core 2\Creating an
Installer\Installer\Volume directory.
2. Follow the instructions on-screen to install the application. By default, the
```
application is created inside the C:\Program Files (x86)\Event-Driven State
```
Machine directory.
3. From the Start menu, navigate to Start»Event-Driven State Machine or from the
```
Windows Explorer, navigate to C:\Program Files (x86)\Event-Driven State
```
Machine directory.
4. Right-click Event-Driven State Machine and select Run as administrator.
Note You must run the application as an administrator because the
application creates a file in the <Program Files> folder. If you do not run
the program as an administrator, Error 8 occurs.
5. Click Yes in the dialog box asking for permission to make changes to the
computer.
6. Test the application by clicking the Acquire button, Clean button, and the Exit
button.
```
Challenge (Optional)
```
If you have Internet access during class, try to debug the application on a remote
computer.
1. Verify that classroom has Internet access.
2. Decide whether to debug a classmate’s application or install your application on
your classmate’s computer.
3. If you decide to debug your own application on a remote computer you must
distinguish your application from the applications already on your classmate’s
computer.
- In the installer build specification, rename your application with a unique
name.
- Transfer your installer to the remote computer using a USB flash drive or the
network.
- Install your application.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-26 | ni.com
4. To use LabVIEW on your computer to debug a running application on a remote
computer, you must determine the IP address of the remote computer, also known
as the destination computer.
Note Consider your computer to be the development computer and your
classmate’s computer to be the destination computer.
- Open the Windows Start menu on the destination computer.
- Enter cmd in the search box and press the <Enter> key.
- Type ipconfig at the prompt in the Command window and press the
<Enter> key.
- Note the IP address.
5. Run the application on the destination computer.
6. On the development computer, launch LabVIEW, if necessary.
7. Select Operate»Debug Application or Shared Library from the LabVIEW menu.
8. Enter the IP address of the destination computer in the Machine name or IP
address text box.
9. Select the application from the Application or shared library drop-down menu.
- Click the Refresh button if the application you want does not appear in the list.
10. Click the Connect button to create the debugging connection.
11. Start debugging the running application.
- Open the block diagram.
- Turn on Execution Highlighting.
- Try using probes, breakpoints, and single-stepping.
12. Stop the application by clicking the Stop button in the debugging window.
Note Refer to theLabVIEW Continuous Integration Tutorial
```
(Jenkins/GitHub) on ni.com for more detailed.
```
End of Exercise 6-3
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-27
E. Creating a Package for Distribution
Create, configure, build, and deploy LabVIEW packages.
Creating Packages
Packages are used to distribute source distributions, packed project libraries, shared
libraries, .NET assemblies, or applications to clients. You can create packages and
deploy them to clients through NI Package Manager or SystemLink.
Before creating packages, create a source distribution, packed project library, shared
library, .NET assembly, or application to include in your packages.
Note You cannot distribute stand-alone VIs.
Package Installer Description
A package installer can only include one main package. Other required packages can
be added as required dependencies of the main package.
The self-contained package installer will only include the dependencies packages with
the required dependency relationship type. Other dependency packages that are
recommended or suggested won't be added to the package installer.
Package Properties—Information and Destination
In the Package Properties dialog box, under Information, enter the name you want to
use for your package in the Package name field. The package name must be all
lowercase and contain no spaces. NI Package Manager and other packages use this
name to reference the package you create.
Under Destinations, set up any destination folders where you plan to install the
package in the client.
Default package installer destination is:
“< the parent directory of the project file> \builds\<project name>\<Build
specifications name>\Package Installer”.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-28 | ni.com
Package Properties—Source Files and Dependencies
Under Source Files, specify which files or build specification outputs you want to
install from the package.
Then configure the dependencies for the package.
Build the Package
```
Click Build. A (Windows) .nipkg file, or (NI Linux Real-Time) .ipk file appears in the
```
destination you specified.
You can distribute the package to clients through Package Manager or SystemLink.
Package Manager does not support .ipk files.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-29
Exercise 6-4: Creating a Package
Goal
Create a package for distributing the stand-alone application.
Hardware Setup
```
(Hardware) In the exercises where we work with Analog Input/Output channels, we
```
use PCI-6221/USB-6212 multifunction I/O device paired with the BNC-2120 shielded
connector block. Analog Input 2 should be connected to the Sine/Triangle BNC
connector. Analog Input 3 should be connected to the TTL Square Wave BNC
connector. The Sine/Triangle waveform switch should be set to Sine.
Scenario
```
Creating a package allows deploying an application (i.e. source distribution, packed
```
```
project library, shared library, .NET assembly, and/or application) to clients through NI
```
Package Manager or SystemLink.
Design
Use a package build specification to create a package that includes the application for
distribution.
Note To successfully build a package, make sure that your exercise source
files are placed in the appropriate location, that is — C:\Exercises\
LabVIEW Core 2\”name of the current exercise”.
Guided Instruction
Creating a Package Build Specification
1. Open C:\Exercises\LabVIEW Core 2\Creating a Package\ Event-Driven State
Machine.lvproj.
2. Right-click Build Specifications in the Project Explorer window
3. Select New»Package from the shortcut menu.
4. Modify the package information.
- Select the Information page.
- Set the package build specification name under the Build specification name
section and filename of the package under the Package name section of the
page.
- Type C:\Exercises\LabVIEW Core 2\Creating a Package\Package as the
Package output directory to specify the package build directory.
5. Specify the install destination under the Destinations page.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-30 | ni.com
*
Select the
Destinations
page.
*
Select
Program Files»Event-Driven State Machine
in the
Destination
tree. Modify the
Destination name
, if needed.
6.

Specify the source files to include in the package on the Source Files page.*
Click the
Source Files
page.
*
Select the
My Application
build specification.
*
Select
Program Files»Event-Driven State Machine
in the
Destination View
tree.
*
Click the right arrow next to the
Project Files View
tree to place the Event-Driven State Machine application and all application support
files under
Program Files»Event-Driven State Machine
in the
Destination
tree as shown in the figure below.
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-31
7. Manage the shortcuts created during the package installation.
- Select the Shortcuts page.
- Under Shortcuts tree, select the Event-Driven State Machine, and optionally
rename it under the Name box. You can select the type of the shortcut under
the Directory drop-down menu - Program Menu for Start menu shortcut, Public
Desktop for Desktop shortcut and Startup for the application to run
automatically on startup. For this example, select the Public Desktop option.
8. Configure the dependencies for a package.
- Select the Dependencies page.
- Select the LabVIEW Runtime (32-bit) and NI-DAQmx Runtime packages, if
they are not already automatically selected.
- You can specify the dependency relationship with the package you select in
the Related packages listbox by selecting the desired dependency relationship
under the Dependency relationship drop-down menu.
9. Under the Package Installer page you can specify whether or not to build your
```
distribution into a package installer file (.exe). You can distribute your application
```
to clients using the package installer. By default, the package installer includes all
the package dependencies in the output so that your clients can install the
package installer without network access.
10. Under the Feed page you can add your package to a feed, so that your clients can
subscribe to the feed to receive update notifications and install the package from
NI Package Manager or NI SystemLink via network access.
11. Click OK.
12. In the Project Explorer window, right-click the My Package build specification and
select Build from the shortcut menu.
13. Click Done when LabVIEW finishes building the package.
14. Save and close the Project Explorer window and close LabVIEW.
Test
1. Navigate to C:\Exercises\LabVIEW Core 2\Creating a Package\Package in
Windows Explorer.
2. Double-click the event-driven-state-machine_1.0.0-0_windows_all.nipkg.
3. When the User Account Control dialog box appears, click Yes to grant the NI
Package Manager administrator rights.
4. Click Next to progress the installation.
5. Click Close to exit setup.
6. Notice that there is a new folder on the desktop called Event-Driven State
Machine.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-32 | ni.com
7. Inside it, you will find the Event-Driven State Machine.exe shortcut, which links
```
to the C:\Program Files (x86)\Event-Driven State Machine directory.
```
8. Right-click Event-Driven State Machine.exe and select Run as administrator.
9. Test the application by clicking the Acquire button, Clean button, and the Exit
button.
Note Your package is visible in the NI Package Manager. To find it, launch
the NI Package Manager, then under the INSTALLED tab remove the
checkmark from the Products only checkbox and search for your package.
Here you can Remove or Repair the installed package.
End of Exercise 6-4
Copyright 2020 National Instruments
LabVIEW Core 2
© National Instruments Corporation | 6-33
```
Activity: Lesson Review
```
1. You need to use LabVIEW build specifications to distribute which of the following
items?
a. Installers
b. ZIP files
c. VIs
d. Applications
2. Mark the following statements True or False
a. Applications that you create with Build Specifications generally have the same
system requirements as the LabVIEW Development System used to create the
VI or application.
b. You create applications to make sure the application behaves the same when
distributed to different systems.
c. Memory requirements vary depending on the size of the application created.
d. You should always include the LabVIEW Run-Time Engine in the application
build specification.
Copyright 2020 National Instruments
Lesson 6 Distributing Applications
6-34 | ni.com
```
Activity: Lesson Review Answers
```
1. You need to use LabVIEW build specifications to distribute which of the following
items?
a. Installers
b. ZIP files
c. VIs
d. Applications
2. Mark the following statements True or False
a. Applications that you create with Build Specifications generally have the same
system requirements as the LabVIEW Development System used to create the
VI or application.
True
b. You create applications to make sure the application behaves the same when
distributed to different systems.
False
c. Memory requirements vary depending on the size of the application created.
True
d. You should always include the LabVIEW Run-Time Engine in the application
build specification.
False
Copyright 2020 National Instruments
A
Additional
Information and
Resources
NI provides global services and support as part of our
commitment to your success. Take advantage of product
services in addition to training and certification programs
that meet your needs during each phase of the application
```
life cycle; from planning and development through
```
deployment and ongoing maintenance.
Copyright 2020 National InstrumentsCopyright 2020 National Instruments
LabVIEW Core 2
© NI | A-3
A. NI Services
To get started, register your product at ni.com/myproducts.
As a registered NI product user, you are entitled to the following benefits:
• Access to applicable product services.
• Easier product management with an online account.
• Receive critical part notifications, software updates, and service expirations.
Log in to your NI ni.com User Profile to get personalized access to your services.
B. Services and Resources
• Maintenance and Hardware Services—NI helps you identify your systems’
accuracy and reliability requirements and provides warranty, sparing, and
calibration services to help you maintain accuracy and minimize downtime over
the life of your system. Visit ni.com/services for more information.
– Warranty and Repair—All NI hardware features a one-year standard warranty
that is extendable up to five years. NI offers repair services performed in a
timely manner by highly trained factory technicians using only original parts at
a NI service center.
– Calibration—Through regular calibration, you can quantify and improve the
measurement performance of an instrument. NI provides state-of-the-art
calibration services. If your product supports calibration, you can obtain the
calibration certificate for your product at ni.com/calibration.
• System Integration—If you have time constraints, limited in-house technical
resources, or other project challenges, National Instruments Alliance Partner
members can help. To learn more, call your local NI office or visit ni.com/alliance.
• Training and Certification—The NI training and certification program is the most
effective way to increase application development proficiency and productivity.
Visit ni.com/training for more information.
– The Skills Guide assists you in identifying the proficiency requirements of your
current application and gives you options for obtaining those skills consistent
with your time and budget constraints and personal learning preferences. Visit
ni.com/
skills-guide to see these custom paths.
– NI offers courses in several languages and formats including instructor-led
classes at facilities worldwide, courses on-site at your facility, and online
courses to serve your individual needs.
• Technical Support—Support at ni.com/support includes the following resources:
– Self-Help Technical Resources—Visit ni.com/support for software drivers and
updates, a searchable KnowledgeBase, product manuals, step-by-step
troubleshooting wizards, thousands of example programs, tutorials,
application notes, instrument drivers, and so on. Registered users also receive
access to the NI Discussion Forums at ni.com/forums. NI Applications
Engineers make sure every question submitted online receives an answer.
```
– Software Support Service Membership—The Standard Service Program (SSP)
```
is a renewable one-year subscription included with almost every NI software
product, including NI Developer Suite. This program entitles members to direct
access to NI Applications Engineers through phone and email for one-to-one
technical support, as well as exclusive access to online training modules at
Copyright 2020 National Instruments
Appendix A
A-4 | ni.com
ni.com/self-paced-training. NI also offers flexible extended contract options
that guarantee your SSP benefits are available without interruption for as long
as you need them. Visit ni.com/ssp for more information.
```
• Declaration of Conformity (DoC)—A DoC is our claim of compliance with the
```
Council of the European Communities using the manufacturer’s declaration of
conformity. This system affords the user protection for electromagnetic
```
compatibility (EMC) and product safety. You can obtain the DoC for your product
```
by visiting ni.com/certification.
For information about other technical support options in your area, visit
ni.com/services, or contact your local office at ni.com/contact.
You also can visit the Worldwide Offices section of ni.com/niglobal to access the
branch office websites, which provide up-to-date contact information, support phone
numbers, email addresses, and current events.
C. Other NI Training Courses
NI offers several training courses for LabVIEW users. These courses continue the
training you received here and expand it to other areas. Visit ni.com/training to
purchase course materials or sign up for instructor-led, hands-on courses at locations
around the world.
D. NI Certification
Earning an NI certification acknowledges your expertise in working with NI products
and technologies. The measurement and automation industry, your employer, clients,
and peers recognize your NI certification credential as a symbol of the skills and
knowledge you have gained through experience. Visit ni.com/training for more
information about the NI certification program.
Copyright 2020 National Instruments