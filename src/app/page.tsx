import Wrapper from '@/components/Wrapper/Wrapper';
import ClientHome from './components/ClientHome/ClientHome';
import { getContentsBytab } from '@/actions/contents';

const HomePage = async () => {
  const res = await getContentsBytab({ tab: 'charts' });
  if (res.status === 'error') {
    throw new Error(res.error);
  }
  const { contents } = res.data;

  return (
    <Wrapper>
      <ClientHome initialData={contents} />
    </Wrapper>
  );
};

export default HomePage;
