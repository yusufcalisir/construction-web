import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

export interface LeadSubmission {
  name: string
  phone: string
  district: string
  propertyType: string
  area: string
  services: string[]
  budget: string
  timeline: string
  notes?: string
  isQualified: boolean
  submittedAt: string
}

const TARGET_EMAIL = 'livangur94@gmail.com'

export async function POST(request: Request) {
  try {
    const data: LeadSubmission = await request.json()

    // Basic server-side validation
    if (!data.name || !data.phone || !data.district || !data.budget) {
      return NextResponse.json(
        { success: false, error: 'Lütfen zorunlu alanları doldurun.' },
        { status: 400 }
      )
    }

    const submittedDate = new Date().toLocaleString('tr-TR', {
      timeZone: 'Europe/Istanbul',
    })

    // Prepare email HTML content
    const qualificationBadge = data.isQualified
      ? '<span style="background: #10B981; color: #fff; padding: 4px 12px; border-radius: 9999px; font-weight: bold; font-size: 13px;">⭐️ NİTELİKLİ PROJE TALEBİ (300.000 TL+)</span>'
      : '<span style="background: #F59E0B; color: #fff; padding: 4px 12px; border-radius: 9999px; font-weight: bold; font-size: 13px;">Standart Talep</span>'

    const servicesList = (data.services || [])
      .map((s) => `<li style="margin-bottom: 4px;">${s}</li>`)
      .join('')

    const cleanPhone = data.phone.replace(/\D/g, '')
    const whatsappLink = `https://wa.me/90${cleanPhone.startsWith('90') ? cleanPhone.slice(2) : cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}`

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; overflow: hidden;">
        <div style="background: #0c0a09; padding: 24px 32px; border-bottom: 2px solid #f59e0b;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Ber Tadilat | Yeni Proje Talebi</h1>
          <p style="color: #d6d3d1; margin: 6px 0 0; font-size: 14px;">Web sitesi Ön Değerlendirme Formu üzerinden yeni bir başvuru alındı.</p>
        </div>
        
        <div style="padding: 32px;">
          <div style="margin-bottom: 24px;">
            ${qualificationBadge}
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px; width: 140px;">Müşteri Adı:</td>
                <td style="padding: 12px 0; color: #1c1917; font-size: 16px; font-weight: 600;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px;">Telefon / WhatsApp:</td>
                <td style="padding: 12px 0; color: #1c1917; font-size: 16px; font-weight: 600;">
                  <a href="tel:${data.phone}" style="color: #0284c7; text-decoration: none;">${data.phone}</a>
                  &nbsp;|&nbsp;
                  <a href="${whatsappLink}" target="_blank" style="color: #16a34a; text-decoration: none; font-weight: bold;">WhatsApp'tan Mesaj At</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px;">İlçe / Bölge:</td>
                <td style="padding: 12px 0; color: #1c1917; font-size: 15px; font-weight: 600;">${data.district}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px;">Mekan & Alan:</td>
                <td style="padding: 12px 0; color: #1c1917; font-size: 15px;">${data.propertyType} (${data.area})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px;">Bütçe Aralığı:</td>
                <td style="padding: 12px 0; color: #b45309; font-size: 16px; font-weight: 700;">${data.budget}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px;">Başlama Zamanı:</td>
                <td style="padding: 12px 0; color: #1c1917; font-size: 15px;">${data.timeline}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px; vertical-align: top;">Yapılacak İşler:</td>
                <td style="padding: 12px 0; color: #1c1917; font-size: 14px;">
                  <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                    ${servicesList}
                  </ul>
                </td>
              </tr>
              ${
                data.notes
                  ? `
              <tr style="border-bottom: 1px solid #f5f5f4;">
                <td style="padding: 12px 0; color: #78716c; font-size: 14px; vertical-align: top;">Ek Notlar:</td>
                <td style="padding: 12px 0; color: #44403c; font-size: 14px; line-height: 1.6;">${data.notes}</td>
              </tr>
              `
                  : ''
              }
              <tr>
                <td style="padding: 12px 0; color: #a8a29e; font-size: 13px;">Başvuru Zamanı:</td>
                <td style="padding: 12px 0; color: #a8a29e; font-size: 13px;">${submittedDate}</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #fafaf9; border: 1px dashed #d6d3d1; border-radius: 12px; padding: 16px; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #57534e;">Müşteriyle doğrudan WhatsApp üzerinden iletişime geçmek için:</p>
            <a href="${whatsappLink}" target="_blank" style="display: inline-block; background: #22c55e; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 10px 24px; border-radius: 8px;">
              Müşteriye WhatsApp'tan Yanıt Ver
            </a>
          </div>
        </div>

        <div style="background: #f5f5f4; padding: 16px 32px; font-size: 12px; color: #78716c; text-align: center; border-top: 1px solid #e7e5e4;">
          Ber Tadilat Yönetim Sistemi • Alıcı: ${TARGET_EMAIL}
        </div>
      </div>
    `

    // Local JSON Backup (safe persistence)
    try {
      const backupDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true })
      }
      const backupFile = path.join(backupDir, 'leads.json')
      let existingLeads: any[] = []
      if (fs.existsSync(backupFile)) {
        const fileContent = fs.readFileSync(backupFile, 'utf8')
        try {
          existingLeads = JSON.parse(fileContent)
        } catch {
          existingLeads = []
        }
      }
      existingLeads.push({ ...data, submittedAt: submittedDate })
      fs.writeFileSync(backupFile, JSON.stringify(existingLeads, null, 2), 'utf8')
    } catch (err) {
      console.warn('Backup file logging note:', err)
    }

    // SMTP / Email Dispatch
    // Check environment variables: SMTP_USER, SMTP_PASS, SMTP_HOST (or GMAIL_USER, GMAIL_APP_PASSWORD)
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpPort = Number(process.env.SMTP_PORT) || 465
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        await transporter.sendMail({
          from: `"Ber Tadilat Form" <${smtpUser}>`,
          to: TARGET_EMAIL,
          replyTo: TARGET_EMAIL,
          subject: `[YENİ TALEP] ${data.isQualified ? '⭐️ 300K+ ' : ''}${data.district} - ${data.name} (${data.budget})`,
          html: emailHtml,
        })
      } catch (mailError) {
        console.error('Mail dispatch error:', mailError)
      }
    } else {
      console.log('Lead received successfully and logged for:', TARGET_EMAIL)
    }

    return NextResponse.json({
      success: true,
      isQualified: data.isQualified,
      message: 'Proje ön değerlendirme talebiniz başarıyla alındı.',
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Talep işlenirken bir hata oluştu.' },
      { status: 500 }
    )
  }
}
