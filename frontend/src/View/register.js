import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export function Register() {
  return (
    <Form>
       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>اسم المستخدم</Form.Label>
        <Form.Control type="text" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>البريد الالكتروني</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.Password">
        <Form.Label>كلمة المرور</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.Password">
        <Form.Label>تأكيد كلمة المرور</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.Button">
        <Button type="submit">تسجيل</Button>
        <Button type="button">خروج</Button>
      </Form.Group>
      
    </Form>
  );
}