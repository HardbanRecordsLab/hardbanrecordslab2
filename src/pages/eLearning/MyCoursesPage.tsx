import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MyCoursesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Moje Kursy</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista Twoich kursów</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tutaj wkrótce pojawi się lista kursów, do których masz dostęp.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCoursesPage;
