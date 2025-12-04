import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
	const { isAuthenticated, user } = useAuth();

	return (
		<div>
			{/* Hero */}
			<section
				style={{
					padding: '80px 20px',
					background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
					color: 'white',
					textAlign: 'center',
					minHeight: 'calc(100vh - 70px)',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
					<h1 style={{ fontSize: '42px', lineHeight: 1.2, marginBottom: '15px' }}>
						{isAuthenticated ? `Bienvenue, ${user.username} !` : 'Apprenez, progressez, réussissez'}
					</h1>
					<p style={{ fontSize: '18px', opacity: 0.9 }}>
						Plateforme de cours en ligne avec authentification, profils et avis.
					</p>

					<div style={{ marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
						<Link
							to="/courses"
							style={{
								padding: '12px 22px',
								backgroundColor: '#3498db',
								color: 'white',
								textDecoration: 'none',
								borderRadius: '6px',
								fontWeight: 600,
							}}
						>
							Explorer les cours
						</Link>

						{isAuthenticated ? (
							<Link
								to="/profile"
								style={{
									padding: '12px 22px',
									backgroundColor: 'transparent',
									color: 'white',
									border: '1px solid rgba(255,255,255,0.6)',
									textDecoration: 'none',
									borderRadius: '6px',
									fontWeight: 600,
								}}
							>
								Accéder à mon profil
							</Link>
						) : (
							<>
								<Link
									to="/login"
									style={{
										padding: '12px 22px',
										backgroundColor: 'transparent',
										color: 'white',
										border: '1px solid rgba(255,255,255,0.6)',
										textDecoration: 'none',
										borderRadius: '6px',
										fontWeight: 600,
									}}
								>
									Se connecter
								</Link>
								<Link
									to="/register"
									style={{
										padding: '12px 22px',
										backgroundColor: '#27ae60',
										color: 'white',
										textDecoration: 'none',
										borderRadius: '6px',
										fontWeight: 600,
									}}
								>
									Créer un compte
								</Link>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Features */}
			<section
				style={{
					padding: '40px 20px',
					maxWidth: '1100px',
					margin: '0 auto',
				}}
			>
				<h2 style={{ textAlign: 'center' }}>Pourquoi nous choisir ?</h2>
				<div
					style={{
						marginTop: '24px',
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
						gap: '18px',
					}}
				>
					{[
						{
							title: 'Catalogue de cours',
							desc: 'Découvrez des cours variés et détaillés avec avis.',
						},
						{
							title: 'Suivi personnalisé',
							desc: 'Un profil dédié avec vos inscriptions et progrès.',
						},
						{
							title: 'Communauté',
							desc: 'Lisez et partagez des avis pour mieux choisir.',
						},
					].map((f) => (
						<div
							key={f.title}
							style={{
								background: 'white',
								border: '1px solid #eee',
								borderRadius: '10px',
								padding: '18px',
								boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
							}}
						>
							<h3 style={{ marginBottom: '8px' }}>{f.title}</h3>
							<p style={{ color: '#666' }}>{f.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Callout */}
			<section
				style={{
					padding: '30px 20px 60px',
					maxWidth: '900px',
					margin: '0 auto',
					textAlign: 'center',
				}}
			>
				<div
					style={{
						background: '#f8f9fa',
						border: '1px solid #eee',
						borderRadius: '10px',
						padding: '24px',
					}}
				>
					<h3>Prêt à commencer ?</h3>
					<p style={{ color: '#666' }}>
						Parcourez la liste complète et trouvez votre prochain cours.
					</p>
					<Link
						to="/courses"
						style={{
							display: 'inline-block',
							marginTop: '12px',
							padding: '12px 22px',
							backgroundColor: '#3498db',
							color: 'white',
							textDecoration: 'none',
							borderRadius: '6px',
							fontWeight: 600,
						}}
					>
						Voir tous les cours
					</Link>
				</div>
			</section>
		</div>
	);
}