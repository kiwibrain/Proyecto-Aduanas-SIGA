import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistema de Gestión Aduanera</h1>
          <p className="text-lg text-gray-600">Portal oficial para el control y gestión de trámites aduaneros.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Viajeros</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Declare sus productos, registre vehículos y gestione autorizaciones para menores.</p>
              <Link href="/login">
                <Button className="w-full">Ingresar como Viajero</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-xl">Funcionario Aduana</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Gestión de trámites, aprobación de ingresos y reportes aduaneros.</p>
              <Link href="/login">
                <Button variant="outline" className="w-full">Acceso Funcionarios</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-xl">Funcionario PDI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Control migratorio y validación de identidad de viajeros.</p>
              <Link href="/login">
                <Button variant="outline" className="w-full">Acceso PDI</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-xl">Funcionario SAG</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Revisión de declaraciones de productos y control fitozoosanitario.</p>
              <Link href="/login">
                <Button variant="outline" className="w-full">Acceso SAG</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}