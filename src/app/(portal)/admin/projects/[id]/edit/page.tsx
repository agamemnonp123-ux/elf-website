import ProjectEditor from '@/components/ProjectEditor';

export default function EditProjectPage({ params }: { params: { id: string } }) {
    return <ProjectEditor id={params.id} />;
}
