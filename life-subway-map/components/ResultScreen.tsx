import { SubwayMapData } from '../types';
import SubwayMap from './SubwayMap';
import { LINE_NAMES } from '../data';

interface ResultScreenProps {
  data: SubwayMapData;
  onRestart: () => void;
}

export default function ResultScreen({ data, onRestart }: ResultScreenProps) {
  const handleShare = () => {
    const text = `나의 인생 지하철 노선도\n\n총 ${data.totalStations}개 역\n${data.totalLines}개 노선\n\n인생 타입: ${data.lifeType}\n\n#인생노선도 #인생지하철`;

    if (navigator.share) {
      navigator.share({
        title: '인생 지하철 노선도',
        text: text,
      }).catch(() => {});
    } else {
      // 폴백: 클립보드 복사
      navigator.clipboard?.writeText(text);
      alert('클립보드에 복사되었습니다!');
    }
  };

  const legendaryStations = data.stations.filter((s) => s.rarity === 'legendary');
  const rareStations = data.stations.filter((s) => s.rarity === 'rare');

  return (
    <div style={{ minHeight: '100vh', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '10px' }}>
          당신의 인생 노선도
        </h1>
        <p style={{ textAlign: 'center', opacity: 0.9, marginBottom: '40px' }}>
          완성되었습니다!
        </p>

        {/* 통계 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>총 운행 노선</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{data.totalLines}개</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>총 경유 역</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{data.totalStations}개</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>환승 경험</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{data.transfers}회</div>
          </div>
        </div>

        {/* 인생 타입 */}
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '10px' }}>당신의 인생 타입</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>"{data.lifeType}"</div>
        </div>

        {/* 희귀 역 */}
        {(legendaryStations.length > 0 || rareStations.length > 0) && (
          <div style={{ marginBottom: '40px' }}>
            {legendaryStations.length > 0 && (
              <div style={{ background: 'rgba(245,158,11,0.2)', padding: '20px', borderRadius: '12px', marginBottom: '10px' }}>
                <div style={{ fontSize: '16px', marginBottom: '10px' }}>⭐ 전설의 역 보유!</div>
                <div style={{ fontSize: '14px' }}>
                  {legendaryStations.map((s) => s.name).join(', ')}
                </div>
              </div>
            )}
            {rareStations.length > 0 && (
              <div style={{ background: 'rgba(59,130,246,0.2)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ fontSize: '16px', marginBottom: '10px' }}>💎 희귀 역: {rareStations.length}개</div>
                <div style={{ fontSize: '14px' }}>
                  {rareStations.map((s) => s.name).join(', ')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 노선 목록 */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>운행 중인 노선</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.lines.map((line) => (
              <div
                key={line.type}
                style={{
                  padding: '10px 20px',
                  background: `${line.color}33`,
                  border: `2px solid ${line.color}`,
                  borderRadius: '20px',
                  fontSize: '14px',
                }}
              >
                {LINE_NAMES[line.type]}
              </div>
            ))}
          </div>
        </div>

        {/* 지하철 노선도 */}
        <div
          style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '40px',
          }}
        >
          <h3 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
            인생 노선도
          </h3>
          <p style={{ textAlign: 'center', fontSize: '14px', opacity: 0.8, marginBottom: '20px' }}>
            역을 클릭하면 상세 정보를 볼 수 있습니다
          </p>
          <SubwayMap data={data} />
        </div>

        {/* 버튼 */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleShare}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              background: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            📤 공유하기
          </button>
          <button
            onClick={onRestart}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🔄 다시 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
