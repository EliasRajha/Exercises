const getPeopleOfClass = (className) => {
    // Find the class object based on className
    const classInfo = classes.find((cls) => cls.name === className);
  
    if (!classInfo) {
      return []; // If class is not found, return an empty array
    }
  
    // Find students in the specified class
    const classStudents = students
      .filter((student) => student.class === className)
      .map((student) => ({ name: student.name, role: 'student' }));
  
    // Find mentors teaching the current module of the class
    const classMentors = mentors
      .filter((mentor) => {
        if (mentor.nowTeaching && mentor.nowTeaching === classInfo.currentModule) {
          return true;
        }
        return false;
      })
      .map((mentor) => ({ name: mentor.name, role: 'mentor' }));
  
    // Combine students and mentors into a single array
    const peopleOfClass = [...classStudents, ...classMentors];
  
    return peopleOfClass;
  };
  const getActiveClasses = () => {
    // Filter out active classes
    const activeClasses = classes.filter((cls) => cls.active);
  
    // Initialize an object to store results
    const activeClassesOverview = {};
  
    // Iterate over each active class and fetch people of that class
    activeClasses.forEach((cls) => {
      const className = cls.name;
      const peopleOfClass = getPeopleOfClass(className); // Utilize previously defined function
  
      // Store the result in the object
      activeClassesOverview[className] = peopleOfClass;
    });
  
    return activeClassesOverview;
  };
  console.log(getPeopleOfClass('class34'));
  console.log(getActiveClasses());
