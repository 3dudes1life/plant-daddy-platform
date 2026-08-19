import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
} from 'react-native';
import type { Caretaker, Plant } from '@plant-daddy/domain';
import { demoPlants } from '@plant-daddy/mock-data';

type Screen = 'plants' | 'care' | 'add' | 'garden' | 'parent';

const caretakerCopy = {
  daddy: { label: 'Daddy', pronouns: 'He/Him', icon: '💪' },
  mama: { label: 'Mama', pronouns: 'She/Her', icon: '🌺' },
  buddy: { label: 'Buddy', pronouns: 'They/Them', icon: '🌱' },
} as const;

export default function App() {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const [caretaker, setCaretaker] = useState<Caretaker>('daddy');
  const [screen, setScreen] = useState<Screen>('plants');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const parent = caretakerCopy[caretaker];

  const summary = useMemo(() => ({
    happy: demoPlants.filter((p) => p.status === 'happy').length,
    attention: demoPlants.filter((p) => p.status === 'attention').length,
    critical: demoPlants.filter((p) => p.status === 'critical').length,
  }), []);

  const colors = dark ? palette.dark : palette.light;

  if (selectedPlant) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
        <ScrollView contentContainerStyle={styles.page}>
          <Pressable onPress={() => setSelectedPlant(null)}>
            <Text style={[styles.back, { color: colors.accent }]}>‹ Plants</Text>
          </Pressable>
          <View style={[styles.heroCard, { backgroundColor: colors.card }]}> 
            <Text style={styles.plantEmojiLarge}>{selectedPlant.emoji}</Text>
            <Text style={[styles.h1, { color: colors.text }]}>{selectedPlant.name}</Text>
            <Text style={[styles.statusHappy, { color: colors.success }]}>Happy 🌱</Text>
          </View>

          <View style={styles.metricRow}>
            <Metric label="Moisture" value={`${selectedPlant.moisturePct ?? '—'}%`} colors={colors} />
            <Metric label="Soil Temp" value={`${selectedPlant.soilTempF ?? '—'}°F`} colors={colors} />
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}> 
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{parent.label} Says</Text>
            <Text style={[styles.body, { color: colors.subtext }]}>{selectedPlant.daddySays.replace(/^Daddy/, parent.label)}</Text>
          </View>

          {['Today', 'History', 'Care', 'Devices', 'Automation', 'Photos'].map((item) => (
            <View key={item} style={[styles.rowCard, { backgroundColor: colors.card }]}> 
              <Text style={[styles.rowTitle, { color: colors.text }]}>{item}</Text>
              <Text style={[styles.chevron, { color: colors.subtext }]}>›</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}> 
      <View style={[styles.demoBanner, { backgroundColor: colors.demo }]}> 
        <Text style={styles.demoText}>DEMO DATA • CLEAN ROOM BUILD</Text>
      </View>
      <ScrollView contentContainerStyle={styles.page}>
        {screen === 'plants' && (
          <>
            <Text style={[styles.eyebrow, { color: colors.subtext }]}>PLANT DADDY</Text>
            <Text style={[styles.h1, { color: colors.text }]}>{parent.label}'s watching {demoPlants.length} plants.</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>No Mac data. No live sensors. Just the new platform.</Text>

            <View style={styles.summaryRow}>
              <Summary value={summary.happy} label="Happy" colors={colors} />
              <Summary value={summary.attention} label="Attention" colors={colors} />
              <Summary value={summary.critical} label="Critical" colors={colors} />
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your plants</Text>
            {demoPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} colors={colors} onPress={() => setSelectedPlant(plant)} />
            ))}
          </>
        )}

        {screen === 'care' && (
          <>
            <Text style={[styles.h1, { color: colors.text }]}>Needs Attention</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>The stuff worth looking at — not every number.</Text>
            {demoPlants.filter((p) => p.status !== 'happy').map((plant) => (
              <View key={plant.id} style={[styles.card, { backgroundColor: colors.card }]}> 
                <Text style={[styles.rowTitle, { color: colors.text }]}>{plant.emoji} {plant.name}</Text>
                <Text style={[styles.body, { color: colors.subtext }]}>{plant.daddySays}</Text>
                <Pressable onPress={() => setSelectedPlant(plant)}>
                  <Text style={[styles.link, { color: colors.accent }]}>View plant →</Text>
                </Pressable>
              </View>
            ))}
            <View style={[styles.card, { backgroundColor: colors.card }]}> 
              <Text style={[styles.rowTitle, { color: colors.text }]}>{parent.label}'s got it. 🌱</Text>
              <Text style={[styles.body, { color: colors.subtext }]}>Anything healthy stays out of the way.</Text>
            </View>
          </>
        )}

        {screen === 'add' && (
          <>
            <Text style={[styles.h1, { color: colors.text }]}>Add Something</Text>
            {[
              ['🌱', 'Add a plant', 'Just a phone is enough.'],
              ['📡', 'Add a sensor', 'Assign hardware to a plant — never the other way around.'],
              ['💦', 'Add smart watering', 'Supported irrigation comes later behind explicit setup.'],
              ['📷', 'Scan a plant', 'Future Ultra identification path.'],
            ].map(([icon, title, desc]) => (
              <View key={title} style={[styles.card, { backgroundColor: colors.card }]}> 
                <Text style={styles.addIcon}>{icon}</Text>
                <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.body, { color: colors.subtext }]}>{desc}</Text>
              </View>
            ))}
          </>
        )}

        {screen === 'garden' && (
          <>
            <Text style={[styles.h1, { color: colors.text }]}>Garden</Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}> 
              <Text style={[styles.rowTitle, { color: colors.text }]}>🏠 Demo Home</Text>
              <Text style={[styles.body, { color: colors.subtext }]}>Tropical Patio • Living Room</Text>
            </View>
            <View style={[styles.card, { backgroundColor: colors.card }]}> 
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Ultra preview 🧠</Text>
              <Text style={[styles.body, { color: colors.subtext }]}>Your plants already generate data. Ultra understands it.</Text>
              <Text style={[styles.ultraPrice, { color: colors.text }]}>$1.99/month</Text>
              <Text style={[styles.body, { color: colors.subtext }]}>Predictive watering • plant-specific intelligence • weather awareness • smart irrigation • automatic care</Text>
            </View>
          </>
        )}

        {screen === 'parent' && (
          <>
            <Text style={[styles.h1, { color: colors.text }]}>Your Plant Parent</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>Pick whoever makes you happy. Your plant data never changes.</Text>
            {(Object.keys(caretakerCopy) as Caretaker[]).map((key) => {
              const option = caretakerCopy[key];
              const active = caretaker === key;
              return (
                <Pressable key={key} onPress={() => setCaretaker(key)} style={[styles.parentOption, { backgroundColor: active ? colors.accentSoft : colors.card, borderColor: active ? colors.accent : colors.border }]}> 
                  <Text style={styles.parentIcon}>{option.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rowTitle, { color: colors.text }]}>{option.label}</Text>
                    <Text style={[styles.body, { color: colors.subtext }]}>{option.pronouns}</Text>
                  </View>
                  <Text style={[styles.check, { color: colors.accent }]}>{active ? '✓' : ''}</Text>
                </Pressable>
              );
            })}
            <View style={[styles.card, { backgroundColor: colors.card }]}> 
              <Text style={[styles.rowTitle, { color: colors.text }]}>Privacy boundary</Text>
              <Text style={[styles.body, { color: colors.subtext }]}>This build cannot discover or read your local Plant Daddy Hub. A future Hub connection must be explicitly enabled and authenticated.</Text>
            </View>
          </>
        )}
      </ScrollView>

      <View style={[styles.nav, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Nav icon="🌱" label="Plants" active={screen === 'plants'} onPress={() => setScreen('plants')} colors={colors} />
        <Nav icon="💧" label="Care" active={screen === 'care'} onPress={() => setScreen('care')} colors={colors} />
        <Nav icon="＋" label="Add" active={screen === 'add'} onPress={() => setScreen('add')} colors={colors} />
        <Nav icon="📊" label="Garden" active={screen === 'garden'} onPress={() => setScreen('garden')} colors={colors} />
        <Nav icon={parent.icon} label={parent.label} active={screen === 'parent'} onPress={() => setScreen('parent')} colors={colors} />
      </View>
    </SafeAreaView>
  );
}

function Summary({ value, label, colors }: any) {
  return <View style={[styles.summary, { backgroundColor: colors.card }]}><Text style={[styles.summaryValue, { color: colors.text }]}>{value}</Text><Text style={[styles.summaryLabel, { color: colors.subtext }]}>{label}</Text></View>;
}

function Metric({ label, value, colors }: any) {
  return <View style={[styles.metric, { backgroundColor: colors.card }]}><Text style={[styles.metricLabel, { color: colors.subtext }]}>{label}</Text><Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text></View>;
}

function PlantCard({ plant, colors, onPress }: { plant: Plant; colors: any; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.plantCard, { backgroundColor: colors.card }]}> 
      <View style={styles.plantTop}>
        <Text style={styles.plantEmoji}>{plant.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>{plant.name}</Text>
          <Text style={[styles.body, { color: colors.subtext }]}>{plant.species}</Text>
        </View>
        <Text style={[styles.moisture, { color: plant.status === 'attention' ? colors.warning : colors.success }]}>{plant.moisturePct}%</Text>
      </View>
      <View style={styles.plantBottom}>
        <Text style={[styles.body, { color: colors.subtext }]}>Soil {plant.soilTempF}°F</Text>
        <Text style={[styles.body, { color: plant.status === 'attention' ? colors.warning : colors.success }]}>{plant.status === 'attention' ? 'Needs attention' : 'Good'}</Text>
      </View>
    </Pressable>
  );
}

function Nav({ icon, label, active, onPress, colors }: any) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <Text style={styles.navIcon}>{icon}</Text>
      <Text style={[styles.navLabel, { color: active ? colors.accent : colors.subtext, fontWeight: active ? '800' : '600' }]}>{label}</Text>
    </Pressable>
  );
}

const palette = {
  light: {
    bg: '#F4F6F1', card: '#FFFFFF', text: '#162217', subtext: '#687169', border: '#E2E7DF',
    accent: '#2E7D4F', accentSoft: '#E3F3E8', success: '#2E7D4F', warning: '#A66516', demo: '#173E2A'
  },
  dark: {
    bg: '#0E1410', card: '#17201A', text: '#F1F5F1', subtext: '#A7B2A9', border: '#2A352D',
    accent: '#78D49A', accentSoft: '#203D2B', success: '#78D49A', warning: '#F1B862', demo: '#295F3F'
  }
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: { padding: 20, paddingBottom: 110, maxWidth: 760, width: '100%', alignSelf: 'center' },
  demoBanner: { paddingVertical: 8, alignItems: 'center' },
  demoText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  eyebrow: { fontSize: 12, fontWeight: '900', letterSpacing: 1.5, marginTop: 8 },
  h1: { fontSize: 32, lineHeight: 38, fontWeight: '900', marginTop: 8 },
  subtitle: { fontSize: 16, lineHeight: 23, marginTop: 8, marginBottom: 18 },
  sectionTitle: { fontSize: 19, fontWeight: '800', marginBottom: 12, marginTop: 6 },
  body: { fontSize: 14, lineHeight: 20 },
  summaryRow: { flexDirection: 'row', gap: 10, marginVertical: 12, marginBottom: 24 },
  summary: { flex: 1, borderRadius: 18, padding: 15 },
  summaryValue: { fontSize: 25, fontWeight: '900' },
  summaryLabel: { fontSize: 12, marginTop: 2, fontWeight: '700' },
  plantCard: { padding: 16, borderRadius: 20, marginBottom: 12 },
  plantTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  plantBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  plantEmoji: { fontSize: 34 },
  plantEmojiLarge: { fontSize: 58 },
  rowTitle: { fontSize: 17, fontWeight: '800' },
  moisture: { fontSize: 27, fontWeight: '900' },
  card: { padding: 18, borderRadius: 20, marginBottom: 12 },
  rowCard: { padding: 17, borderRadius: 16, marginBottom: 9, flexDirection: 'row', alignItems: 'center' },
  chevron: { marginLeft: 'auto', fontSize: 26 },
  link: { marginTop: 12, fontWeight: '800' },
  addIcon: { fontSize: 32, marginBottom: 8 },
  ultraPrice: { fontSize: 29, fontWeight: '900', marginVertical: 10 },
  parentOption: { borderWidth: 1.5, borderRadius: 20, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 14 },
  parentIcon: { fontSize: 34 },
  check: { fontSize: 22, fontWeight: '900' },
  nav: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, paddingTop: 8, paddingBottom: 18, flexDirection: 'row' },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 10, marginTop: 3 },
  back: { fontSize: 17, fontWeight: '800', marginBottom: 10 },
  heroCard: { padding: 22, borderRadius: 24, marginBottom: 12 },
  statusHappy: { fontWeight: '800', marginTop: 6 },
  metricRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metric: { flex: 1, padding: 18, borderRadius: 18 },
  metricLabel: { fontSize: 12, fontWeight: '700' },
  metricValue: { fontSize: 28, fontWeight: '900', marginTop: 4 }
});
