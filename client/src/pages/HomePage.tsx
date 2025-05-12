import Form from '../components/Form/Form.tsx';
import MainLayout from '../layout/MainLayout.tsx';
import Posts from '../components/Posts/Posts.tsx';

export default function HomePage(){
     return (
      <MainLayout >
        <Form />
        <Posts></Posts>
      </MainLayout>
    );
}