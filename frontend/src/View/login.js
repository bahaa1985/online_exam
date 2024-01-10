import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function Login() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>اسم المستخدم</Form.Label>
                <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group>
                <Form.Label>كلمة المرور</Form.Label>
                <Form.Control type="password" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group>
                <Button type="submit">دخول</Button>
                <Button type="reset">إلغاء</Button>
            </Form.Group>
        </Form>
    )
}