import ResultDetails from '@/components/shared/results/result-deatils';

const ResultPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  return <ResultDetails resultId={id} />;
};

export default ResultPage;
