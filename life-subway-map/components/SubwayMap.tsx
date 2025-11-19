import { useState } from 'react';
import { SubwayMapData, Station } from '../types';
import { LINE_COLORS } from '../data';

interface SubwayMapProps {
  data: SubwayMapData;
}

export default function SubwayMap({ data }: SubwayMapProps) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // 간단한 노선도 레이아웃 (실제로는 더 복잡하게 가능)
  const stationPositions: Record<string, { x: number; y: number }> = {};
  let yOffset = 100;

  data.lines.forEach((line, lineIdx) => {
    const xOffset = 150;
    line.stations.forEach((station, stationIdx) => {
      stationPositions[station.id] = {
        x: xOffset + stationIdx * 120,
        y: yOffset + lineIdx * 80,
      };
    });
  });

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative', overflowX: 'auto', overflowY: 'hidden' }}>
      <svg width="800" height="600" style={{ minWidth: '800px' }}>
        {/* 노선 그리기 */}
        {data.lines.map((line) => {
          const stations = line.stations.map((s) => stationPositions[s.id]);
          if (stations.length < 2) return null;

          return (
            <g key={line.type}>
              {stations.map((pos, idx) => {
                if (idx === 0) return null;
                const prev = stations[idx - 1];
                return (
                  <line
                    key={idx}
                    x1={prev.x}
                    y1={prev.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={LINE_COLORS[line.type]}
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          );
        })}

        {/* 역 그리기 */}
        {data.stations.map((station) => {
          const pos = stationPositions[station.id];
          if (!pos) return null;

          return (
            <g
              key={station.id}
              onClick={() => setSelectedStation(station)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="16"
                fill="white"
                stroke={LINE_COLORS[station.line]}
                strokeWidth="4"
              />
              <text
                x={pos.x}
                y={pos.y + 35}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {station.name}
              </text>
              {station.rarity === 'legendary' && (
                <text x={pos.x + 20} y={pos.y - 20} fontSize="20">
                  ⭐
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* 역 상세 정보 팝업 */}
      {selectedStation && (
        <div
          onClick={() => setSelectedStation(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '400px',
              width: '100%',
              color: '#333',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                borderBottom: `4px solid ${LINE_COLORS[selectedStation.line]}`,
                paddingBottom: '10px',
              }}
            >
              🚉 {selectedStation.name}
            </div>
            <div style={{ fontSize: '16px', marginTop: '20px', lineHeight: '1.6', color: '#666' }}>
              {selectedStation.description}
            </div>
            {selectedStation.percentage && (
              <div style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
                💡 이 역을 가진 사람: <strong>{selectedStation.percentage}%</strong>
              </div>
            )}
            {selectedStation.rarity === 'legendary' && (
              <div style={{ marginTop: '10px', fontSize: '16px', color: '#F59E0B', fontWeight: 'bold' }}>
                ⭐ 전설의 역!
              </div>
            )}
            {selectedStation.rarity === 'rare' && (
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#3B82F6' }}>
                💎 희귀한 역
              </div>
            )}
            <button
              onClick={() => setSelectedStation(null)}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                fontSize: '16px',
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
