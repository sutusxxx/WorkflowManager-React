import Container from "../../components/layouts/Container";
import type { Route } from "./+types/dashboard";

export default function Page({ loaderData }: Route.ComponentProps) {
    return (
        <Container>
            Dashboard page works
        </Container>
    );
}