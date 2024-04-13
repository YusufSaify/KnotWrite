class person {

    String name;
    int age;

    void setdetails(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void getdetails() {
        System.out.println("\nName : " + name + "\nAge : " + age);
    }

}

class employee extends person {

    int salary;

    void setdetails(String name, int age, int salary) {
        setdetails(name, age);
        this.salary = salary;

    }
    
    @Override
    public void getdetails(){
        super.getdetails();
        System.out.println("Salary : " + this.salary);
    }

    public static void main(String Args[]) {

        employee p1 = new employee();
        person p2 = new person();
        p2.setdetails("alefiya saify", 12);
        p1.setdetails("yusuf saify", 20,50000);
        p1.getdetails();
        p2.getdetails();

    }

}