import Wrapper from '@/components/Wrapper/Wrapper';
import { getContentsBytab } from '@/actions/contents';
import { VALID_TABS } from '@/constants/tabs';
import { isValidValue } from '@/utils/utils';
import { ContentsTabs } from '@/types/contents';
import ContentsWrapper from './components/Contents/ContentsWrapper';
import HeaderTab from './components/HeaderTab/HeaderTab';
import Banner from './components/Banner/Banner';

interface HomePageProps {
  searchParams: {
    tab?: ContentsTabs;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const tabParam = searchParams.tab ?? '';

  const tab: ContentsTabs = isValidValue(tabParam, VALID_TABS)
    ? tabParam
    : 'charts';

  const res = await getContentsBytab({ tab });

  return (
    <Wrapper>
      <HeaderTab<ContentsTabs> tabs={VALID_TABS} />
      <main>
        <Banner />
        <ContentsWrapper initialData={res} />
      </main>
    </Wrapper>
  );
};

export default HomePage;
