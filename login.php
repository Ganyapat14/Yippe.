<?php
// เริ่มต้น session
session_start();

// เชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root"; // เปลี่ยนให้ตรงกับข้อมูลจริง
$password = ""; // เปลี่ยนให้ตรงกับข้อมูลจริง
$dbname = "yippe_ticket"; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ตรวจสอบว่าแบบฟอร์มล็อกอินได้รับการส่งมาหรือไม่
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รับข้อมูลจากฟอร์มและป้องกัน SQL Injection
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // ใช้ Prepared Statement เพื่อป้องกัน SQL Injection
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // 's' หมายถึง string
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // ตรวจสอบรหัสผ่าน
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // เก็บข้อมูลผู้ใช้ใน session และสร้าง session ID ใหม่เพื่อความปลอดภัย
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            // เปลี่ยนหน้าไปที่หน้าหลักหรือหน้าอื่นๆ
            header("Location: homepage.html");
            exit();
        } else {
            echo "<script>alert('รหัสผ่านไม่ถูกต้อง');</script>";
        }
    } else {
        echo "<script>alert('อีเมลนี้ไม่พบในระบบ');</script>";
    }

    // ปิดการเชื่อมต่อ
    $stmt->close();
}

$conn->close();
?>
