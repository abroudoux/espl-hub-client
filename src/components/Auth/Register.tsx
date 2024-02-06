import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useStore from "@/lib/store";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";

export default function Register() {
  const { setToken, setUsername } = useStore();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [competences, setCompetences] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "status":
        setStatus(e.target.value);
        break;
      case "competences":
        setCompetences(e.target.value);
        break;
      default:
        break;
    }
  };

  async function createUser(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          status: status,
          competences: competences,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", response);
        toast.error(
          "Une erreur est survenue durant l'appel de l'API, veuillez réessayer"
        );
      } else {
        console.log("Success:", response);
        toast.success("Votre compte a bien été créé");
        setToken(data.token);
        navigate("/");
        setIsLoading(false);
        setUsername(firstName);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TabsContent value="signin">
      <Card>
        <CardHeader>
          <CardTitle>S'inscrire</CardTitle>
          <CardDescription>Nouveau ici ? Créez un compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              autoComplete="off"
              name="firstName"
              id="firstName"
              type="text"
              value={firstName}
              placeholder="Votre prénom"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              autoComplete="off"
              name="lastName"
              id="lastName"
              type="text"
              value={lastName}
              placeholder="Votre nom"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="off"
              name="email"
              id="email"
              type="email"
              value={email}
              placeholder="Votre email"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Saisissez un mot de passe"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status">Statut</label>
            <select
              name="status"
              id="status"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="student">student</option>
              <option value="teacher">teacher</option>
              <option value="company">company</option>
              <option value="association">association</option>
              <option value="other">other</option>
            </select>
          </div>
          <div>
            <label htmlFor="competences">Compétences</label>
            <select
              name="competences"
              id="competences"
              defaultValue={competences}
              onChange={(e) => setCompetences(e.target.value)}
            >
              <option value="ux/ui">ux/ui</option>
              <option value="development">development</option>
              <option value="design">design</option>
              <option value="marketing">marketing</option>
              <option value="communication">communication</option>
            </select>
          </div>
          {/* <div className="space-y-1">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Votre statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Statut</SelectLabel>
                      <SelectItem value="student">Etudiant</SelectItem>
                      <SelectItem value="teacher">Intervenant</SelectItem>
                      <SelectItem value="company">Entreprise</SelectItem>
                      <SelectItem value="association">Association</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="skills">Compétences</Label>
                <Select
                  value={competences}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Vos compétences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Compétences</SelectLabel>
                      <SelectItem value="developpement">
                        Développement
                      </SelectItem>
                      <SelectItem value="ux/ui">UX / UI</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="communication">
                        Communication
                      </SelectItem>
                      <SelectItem value="design">Création Numérique</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> */}
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} onClick={createUser}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            S'inscrire
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}